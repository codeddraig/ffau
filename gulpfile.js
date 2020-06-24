const fs = require('fs');
const cp = require('child_process');

// Define a list of legal characters in CSS selectors
let selectorChars = 'abcdefghijklmnopqrstuvwxyz';
selectorChars += selectorChars.toUpperCase();
selectorChars += [...Array(26).keys()].join('');
selectorChars += '_-.#:[]=';
selectorChars = selectorChars.split('');

function compileStyles(cb) {
    // Define the Chrome `Array.flat()` to work with Node.js
    Object.defineProperty(Array.prototype, 'flat', { // Define a property in the array prototype
        value: function (depth = 1) {
            return this.reduce(function (flat, toFlatten) { // For each item in the array
                return flat.concat(
                    (Array.isArray(toFlatten) && (depth > 1)) ? // If the remaining depth is greater than one
                    toFlatten.flat(depth - 1) : // Recurse on, with the next depth level
                    toFlatten,  // Otherwise, return the array
                ); //                 flattened into just the pure items by .concat()
            }, []);
        },
    });

    // Redefine String.prototype.strip to work a bit more like in Python, where the characters to strip can be customised
    Object.defineProperty(String.prototype, 'strip', {
        // Accept any string of characters to strip, with default set to that of the built-in JS String.prototype.strip...
        value: function (characters = ' \t\r\n') { // ... function/method. The characters are auto-escaped
            let characterRef = characters // Escape
                .replace(/[\]\\\-^]/, '\\$&') // Escape volatile regex characters
                .replace('\n', '\\n') // Double-escape escaped characters
                .replace('\r', '\\r')
                .replace('\t', '\\t');

            // Construct regex and remove matches.
            return this.replace(new RegExp(`(^[${characterRef}]+)|([${characterRef}]+$)`), '');
        },
    });

    // Helper function to return the bounds of where string (keepStrings === true) or non-string (keepStrings === false)
    // zones start and end, as a nested list of start and end indicies of the zones (e.g `stringBounds('testing["123"..."456"]', false)`
    // returns `[[0, 8], [13, 16], [21, 22]]`)
    function stringBounds(string, keepStrings) {
        // Split by the speech marks, noting escaped marks.
        let stringPoints = string.split(new RegExp('(([\'"])(\\\\.|[^\'"])*\\2)'));

        let newStringPoints = [0];
        for (let z = 0, point = stringPoints[0]; z < stringPoints.length; z++, point = stringPoints[z])
            if (z % 4 === 0 || z % 4 === 1) // Ignore every third and fourth element which are only there because of Regex grouping
                // Get the indexes with every two elements being a pair of indexes of normal text, e.g `test["abc"].on`
                // becomes [0, 5, 11, 14]
                newStringPoints.push(point.length + newStringPoints.slice().pop());

        // Now, we want to get a list of start and end points of the strings, grouped
        newStringPoints = newStringPoints.map(_ => [_, _]).flat(); // Repeat each element
        newStringPoints = newStringPoints.slice(1, -1); // Remove the first and last (still leaving their repeated copies)
        newStringPoints = newStringPoints.map((r, n) => n % 2 === 1  // And then convert every second element
            && [newStringPoints[n - 1], r]); // into a list containing it and the previous element, grouping them
        newStringPoints = newStringPoints.filter(z => z);  // And them remove every other second element,
        newStringPoints = newStringPoints.filter((_, z) => z % 2 === keepStrings + 0); // and removing the items we don't want

        return newStringPoints;
    }

    // Helper function to return the contents of a string minus all of the text in speech marks (keepStrings === false)
    // or only the text in the speech marks (keepStrings === true)
    function onlyInStringContents(string, keepStrings) {
        let stringPoints = stringBounds(string, keepStrings); // Get the bounds of the string/non-string area

        let newStr = '';
        stringPoints.forEach(stringPoint => {
            newStr += string.substr(stringPoint[0], stringPoint[1] - stringPoint[0]); // Take all of these bounds from the string
        });

        return newStr;
    }

    // Helper function to split a string *by a character* (not Regex) if the given instance of the character is not
    // inside a string. This is helpful when trying to identify class references using '.' (e.g '.class.name') while
    // avoiding false-positives, e.g 'input.class.name[value="I love dogs."]'
    function splitIfNotInString(string, character) {
        let stringPoints = stringBounds(string, true);
        let charPoints = string
            .split('')
            .reduce((a, e, i) => e === character ? a.concat(i) : a, []); // Get all indexes of character in string

        // Now, we'll check which of our character points are in this range
        let goodCharPoints = charPoints.filter(e =>
            stringPoints.every(t =>  // Ensure that for every string range...
                t[0] > e || e > t[1],  // This character index is within it
            ),
        );

        let selectors = [];

        let lastPoint = 0;
        goodCharPoints.forEach(point => {
            selectors.push(
                string.slice(lastPoint, point), // Split the original string
            );                                 // using the list of indexes we just generated

            lastPoint = point + 1;
        });
        selectors.push(string.slice(lastPoint));

        return selectors;  // Return the split string
    }

    // Helper function to convert CSS filename to JSON
    function toDB(filename) {
        let data = fs.readFileSync(filename); // Read file into CSS string

        let css = ' ' + data; // Prepend a space since we will be doing backwards referencing later, and want to avoid ReferenceErrors

        let cssObj = [];

        let matchSoFar = '';
        let bodySoFar = '';
        let inComment = false;
        let inBracket = false;
        let inString = false;

        for (let i = 1, char = css[1]; i < css.length; i++, char = css[i]) {  // Go through each character of the string
            if (css[i - 1] + char === '/*' && !inString) { // Detect if we are in a comment
                inComment = true; // If so, mark this as being the case
                bodySoFar = bodySoFar.slice(0, -1); // And remove the opening-comment characters
            }

            if (!inComment) { // If we aren't in a comment
                if (char === '\'' || char === '"') // Check if we are on a string character
                    if (css[i - 1] !== '\\') // If the string character isn't escaped
                        if (!inString) // Either open a string if we aren't already in one
                            inString = char;
                        else if (char === inString) // Or close an existing one if we are in it
                            inString = false;

                // If we have extraneous double space, skip it (to minify the CSS). Otherwise:
                if (!((css[i - 1] + char === '  ' || char === '\r' || char === '\t') && !inString)) {
                    if (inBracket) { // If we are inside a CSS body (i.e between `{` and `}`
                        bodySoFar += char; // Append the character into the tracking str

                        // If we are at the end of the selector, we need to gather all of our info about the selector
                        // and CSS body and save them to our final array.
                        if (char === '}') {
                            inBracket = false; // Mark to the next iteration that we are no longer in the previous body

                            /*
                            We need to parse the selector into a nicer format to interpret later. This involves
                            breaking it up into three sub-categories:
                               - Reps: sections separated with commas, which have the same CSS body; these will simply
                                       be repeated in the output file (e.g `.a, .b {...}` becomes `.a {...}, .b {...}`
                                       for simplification (not minification) purposes. This may be minified back
                                       later in `toCSS()`.
                               - Groups: sections separated with other combinators, such as ` ` or `+`, which work as
                                       breakpoints - things can be inserted between them and the next item. E.g
                                       if we wanted to insert `div.d ` into `.a + .b.c`, we split it up into
                                       [".a + ", ".b.c"] so we can tell we can insert between `+ ` and `.b`, but not
                                       between `.b` and `.c` since that would result in the mess that is `.bdiv.d .c`
                               - Chunks: However, we do need to note somehow the _contents_ of the groups (e.g separating
                                       out `.b` and `.c` from `.b.c`, even if we don't put anything between them), so
                                       that we can check if they contain any of the things that we are looking for (e.g.
                                       if we are scanning for `.c`, we need to know it is a part of the group `.b.c`). We
                                       do this here, not at a later step, because it involves string avoidance (e.g how
                                       do you break up `.b.c[type=".d"]?), and fancy things like that should be built into
                                       the function.

                            The combination of the latter two will leave us with a nested array, while the first just
                            repeats the body, leaving us with `.a, #b + .c.d[type='.e']` turning into
                            [[[".a"]], [["#b + "], [".c", ".d[type='.e'"]]]
                            */

                            // Remove opening bracket from end of selector
                            let selectorName = matchSoFar.trimRight().replace(/{$/g, '').trim();

                            // Get all of the reps
                            let selectors = splitIfNotInString(selectorName, ',')
                                .map(z => z.strip(' {')); // And remove trailing/leading whitespace and brackets

                            let selectorReps = [];
                            selectors.forEach(selector => { // Go through each rep
                                let selectorSplit = splitIfNotInString( // Split by the
                                    splitIfNotInString( // Split by class marker (.)
                                        splitIfNotInString(selector, '{')
                                            .join('') // Remove all opening braces
                                            .trim(), // And trim the string
                                        '.',
                                    ).filter(z => z) // Filter empty values
                                        .map((z, w) => w > 0
                                                       ? '.' + z
                                                       : z) // Re-append the class marker (except the first)
                                        // Use the `{` as a marker for later where to split, to simulate splitting by
                                        // both `#` and `.`. We're essentially doing
                                        //
                                        //        `selector.split(".").join("{").split("#").join("{").split("{")`
                                        //
                                        // but with `splitIfNotInString` (which cannot handle regex, so this is the only
                                        // way). We're using the brace character in particular, as strange as it may be,
                                        .join('{'), // since we know it isn't in the string (as we just removed it)
                                    '#',
                                )
                                    .filter(z => z) // Filter empty values
                                    .map((z, w) => w > 0 ? '#' + z : z) // Re-append the ID marker (except the first)
                                    .join('{'); // Use the `{` marker (again)

                                selectorSplit = splitIfNotInString(selectorSplit, '{'); // Split by the `{`

                                // Prepend the _first_ ID/class marker; this needs to be done separately since the first
                                // is the only place _required_, e.g div.a is possible, but not having a `.` or `#` is not
                                // possible elsewhere, since it would just merge with the class/ID name (e.g .adiv).
                                if (['.', '#'].includes(selector[0]))
                                    selectorSplit[0] = selector[0] + selectorSplit[0];

                                // Now that we have a list of chunks, we need to organise them into their corresponding
                                // groups.
                                let newSelectorSplit = [];
                                let thisSelectorSplit = [];
                                let keepNext = false;
                                selectorSplit.forEach(chunk => { // Go through each chunk

                                    // Check if the piece is a member of a chunk group (if no combinator characters are included)
                                    let thisIsGood = onlyInStringContents(chunk, false)
                                        .split('').every(c => selectorChars.includes(c));

                                    if (thisIsGood) { // If it is, save this section

                                        // And mark to unconditionally keep the next one (this is necessary since if
                                        // the next one is the one to break the group, we need to know that a group
                                        // _was_ ongoing so we need to save _it_ as part of the group, but not the
                                        keepNext = true; // one after that.
                                        thisSelectorSplit.push(chunk);
                                    } else if (keepNext) { // If we are breaking out of the group
                                        keepNext = false;
                                        thisSelectorSplit.push(chunk); // Save this chunk

                                        newSelectorSplit.push(thisSelectorSplit); // Save this group
                                        thisSelectorSplit = []; // Reset the group
                                    } else {
                                        newSelectorSplit.push([chunk]); // If no group is formed, just push as is.
                                    }
                                });

                                newSelectorSplit.push(thisSelectorSplit); // Save the last group (even if there isn't one)
                                selectorReps.push(newSelectorSplit); // Save this rep.
                            });

                            cssObj.push({ // Save to the output DB...
                                selectors: selectorReps.map(e => // The list of reps
                                    e.map(v => v.filter(r => r)) // with all empty items removed
                                        .filter(r => r.length), //   from all nesting layers
                                ).filter(r => r.length), //         (empty strings incl.)
                                cssText: // Also save the CSS text, but minify:
                                    splitIfNotInString(         // Remove the newlines,
                                        splitIfNotInString(     // carriage returns,
                                            splitIfNotInString( // and tabs.
                                                bodySoFar,
                                                '\t',
                                            ).join(''),
                                            '\r',
                                        ).join(''),
                                        '\n',
                                    ).join('')
                                        .slice(0, -1) // Then, remove the first character (which is the bracket)
                                        .trim(), // And finally trim the excess whitespace
                            });

                            matchSoFar = ''; // Once we have saved the selector and CSS contents, we can reset for the next
                            bodySoFar = ''; // selector.
                        }
                    } else { // If the character we are currently iterating on is a selector, i.e we are not yet in a body
                        matchSoFar += char; // Just save the character
                        if (char === '{') // but mark if we enter a body
                            inBracket = true;
                        else if (char === '\n') // and reset after newlines (to avoid malformed CSS)
                            matchSoFar = '';
                    }
                }
            } else if (css[i - 1] + char === '*/') // If we are in a comment and we see the closing-comment characters
                inComment = false; // Escape comment mode
        }

        return cssObj; // Return the final DB
    }

    // Helper function to convert CSS DB into pure CSS text (minified)
    function toCSS(cssObj) {
        let writeStr = '';
        cssObj.forEach(selector => { // Go through each selector
            let repSet = selector.selectors;
            repSet.forEach((rep, i) => { // And go through all of the reps
                writeStr += rep.map(z => z.join('')) // Join the chunks into strings
                    .join('').trim(); // And then the groups into a string, and save to the running CSS string
                if (i !== repSet.length - 1) writeStr += ','; // Also, append the comma between each item in the rep.
            });

            writeStr += `{${selector.cssText}}`; // Then, append the (already minified) CSS body.
        });

        return writeStr; // Return the final string of all selectors in the DB.
    }

    //===============================================================================================================
    //|                                                CODE STARTS                                                  |
    //===============================================================================================================

    // Delete the existing compile dest. file.
    if (fs.existsSync('dist/ffau.css'))
        fs.unlinkSync('dist/ffau.css');

    // Helper function to establish full relative path of theme, and check if it is a file (not a dir); designed to populate
    // `readdir` queries.
    const themify = list => list
        .map(f => './src/themes/' + f)
        .filter(f => fs.existsSync(f) && f.endsWith('.css'));

    let cssFiles = themify( // Get all of the theme files
        fs.readdirSync('src/themes').filter(
            f =>
                !( // Theme files do not:
                    f.endsWith('__.css') && // end in `__`
                    f.startsWith('__')      // or start with `__`
                ),
        ),
    );

    let globalFiles = themify( // Get all of the global files
        fs.readdirSync('src/themes').filter(
            f =>
                ( // Global files are files that:
                    f.endsWith('__.css') && // end in `__`
                    f.startsWith('__')      // and start with `__`
                ),
        ),
    );

    let cssData = ''; // Establish to final, output CSS string that we will write to the output file

    globalFiles.forEach(filename => { // Go through all of the global styling files first
        filename === './src/themes/__styles__.css' ? // If it's the default one,
        cssData += '\n\n/* Global Ffau styles */\n' : // insert the template title
        cssData += '\n\n/* Global styles (' // Otherwise, insert a title based on the name of the file
            + filename.slice(15, -6)
            + ') */\n';

        cssData += toCSS(toDB(filename)); // Use CSS -> DB -> CSS to minify CSS and insert on one line
    });

    cssData += '\n\n'; // Add separator between global and theme-specific files

    cssFiles.forEach(filename => { // Go through all theme files
        let cssDB = toDB(filename); // Get the DB form of the file
        let newDB = cssDB; // Save a backup that we can edit

        let cssFileName = filename.split('/').slice().pop().slice(0, -4); // Extract the raw filename as the theme name

        cssDB.forEach((selectorSet, i) => { // Go through each body in the DB
            let newSelectorSet = selectorSet; // Save a backup of the selector name structure for editing

            selectorSet.selectors.forEach((repSet, z) => { // Go through the reps
                repSet.forEach((group, b) => { // Go through the groups
                    if ([
                        '.blocklyToolboxDiv', '.blocklyTreeRoot', '.blocklyTreeRow', '.blocklyHidden',
                        '.blocklyTreeLabel', '.blocklyTreeIcon', '.blocklyTreeIconClosedLtr', '.blocklyTreeIconNone',
                        '.blocklyTreeSeparator', '.blocklySvg', '.blocklyWorkspace', '.blocklyMainBackground',
                        '.blocklyTrash', '.blocklyBlockCanvas', '.blocklyBubbleCanvas', '.blocklyScrollbarBackground',
                        '.blocklyZoom', '.blocklyScrollbarVertical', '.blocklyMainWorkspaceScrollbar', '.blocklyScrollbarHandle',
                        '.blocklyScrollbarHorizontal', '.blocklyFlyout', '.blocklyFlyoutBackground', '.blocklyFlyoutScrollbar',
                        '.blocklyBlockDragSurface', '.blocklyWsDragSurface', '.blocklyOverflowVisible', '.blocklyWidgetDiv',
                        '.blocklyTooltipDiv', '.blocklyText', '.themify',
                    ]
                        .some(prefix => group.some(g => g.startsWith(prefix)))) // If any of our chunks is one of the Blockly classes
                        newSelectorSet.selectors[z][b] = [
                            'div.injectionDiv.blocklyTheme' // Prepend the descendant selector
                            + cssFileName.charAt(0).toUpperCase()                             // to ensure it is only matched
                            + cssFileName.slice(1)                                            // when the given theme is used
                            + ' '
                            + group.map(e => e.trim().replace(/^\.themify */g, '')) // Add special case for `.themify`
                                .join('').trim(),
                        ]; // Flatten the rest of the selector to avoid repeating the process
                });
            });

            newDB[i] = newSelectorSet; // Update the DB with the new selector set
        });

        let cssStr = toCSS(newDB); // Convert the new DB to the pure CSS string
        cssData += '\n\n/*Theme \'' + cssFileName + '\'*/\n' // Append the heading
            + cssStr                                                      // Add the verification: a quick `::before`
            + '.verifyBlocklyTheme'                                       // with a specific value to allow the JS to
            + cssFileName.charAt(0).toUpperCase() + cssFileName.slice(1)  // check if a theme is legitimate and intact
            + '::before{content:\'verify-'                                // before trying to load it, and potentially
            + cssFileName                                                 // exposing the horrible default Blockly design
            + '\';}';
    });

    // Add the default info text, and combine with the newly generated CSS string
    let writeStr = [
        '/*\n',
        '\tTHIS FILE IS AUTO-GENERATED BY `gulpfile.js:compileStyles()`. DO NOT TAMPER MANUALLY:\n',
        '\t\tEDIT THE FILES IN `./src/themes` AND RUN `gulp` FROM PROJECT ROOT\n',
        '\n\tThis version generated: ' + new Date().toISOString(),
        '\n*/\n',
        cssData,
    ].join('');

    fs.writeFile('./dist/ffau.css', // Write the file to the new export location
        writeStr, err => {
            if (err) throw 'Write failed with error: \n' + err; // Handle error

            console.log('Success! See `dist/ffau.css` for output code, or use:');
            console.log('\t<link href="dist/ffau.css" rel="stylesheet">');
            console.log('in the <head> of your HTML file to import the new themes.');
        },
    );

    cb();
}

exports.default = compileStyles;
