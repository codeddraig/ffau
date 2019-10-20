const fs = require("fs");

let selectorChars = "abcdefghijklmnopqrstuvwxyz";
selectorChars += selectorChars.toUpperCase();
selectorChars += [...Array(26).keys()].join('');
selectorChars += "_-.#:";
selectorChars = selectorChars.split('');

function compileStyles(cb) {
    Object.defineProperty(Array.prototype, 'flat', {
        value: function (depth = 1) {
            return this.reduce(function (flat, toFlatten) {
                return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
            }, []);
        }
    });

    function splitIfNotInString(string, character) {
        let stringPoints = string.split(new RegExp("((['\"])(\\\\.|[^'\"])*\\2)"));
        let charPoints = string
            .split('')
            .reduce((a, e, i) => e === character ? a.concat(i) : a, []);

        let newStringPoints = [0];
        for (let z = 0, point = stringPoints[0]; z < stringPoints.length; z++, point = stringPoints[z])
            if (z % 4 === 0 || z % 4 === 1)
                newStringPoints.push(point.length + newStringPoints.slice().pop());

        newStringPoints = newStringPoints.map(_ => [_, _]).flat().slice(1, -1);
        newStringPoints = newStringPoints.map((r, n) => n % 2 === 1
            && [newStringPoints[n - 1], r])
            .filter(z => z);
        newStringPoints = newStringPoints.filter((_, z) => z % 2);

        let goodCharPoints = charPoints.filter(e =>
            newStringPoints.every(t =>
                t[0] > e || e > t[1]
            )
        );

        let selectors = [];

        let lastPoint = 0;
        goodCharPoints.forEach(point => {
            selectors.push(
                string.slice(lastPoint, point)
            );

            lastPoint = point + 1;
        });
        selectors.push(string.slice(lastPoint));

        return selectors;
    }

    function toJSON(filename) {
        let data = fs.readFileSync(filename);

        let css = " " + data;

        let cssObj = [];

        let matchSoFar = "";
        let bodySoFar = "";
        let inComment = false;
        let inBracket = false;
        let inString = false;

        for (let i = 1, char = css[1]; i < css.length; i++, char = css[i]) {
            if (css[i - 1] + char === "/*" && !inString) {
                inComment = true;
                bodySoFar = bodySoFar.slice(0, -1);
            }

            if (!inComment) {
                if (char === "'" || char === '"')
                    if (!inString && css[i - 1] !== "\\")
                        inString = char;
                    else if (char === inString)
                        inString = false;

                if (!(css[i - 1] + char === "  " && !inString)) {
                    if (inBracket) {
                        bodySoFar += char;

                        if (char === "}") {
                            inBracket = false;

                            let selectorName = matchSoFar.replace(/{/g, "").trim();
                            let selectors = splitIfNotInString(selectorName, ",")
                                .map(z => z.replace(/(^[{ ]*)|([{ ]*$)/g, ""));

                            selectors.forEach(selector => {
                                let selectorSplit = splitIfNotInString(
                                    selector.replace(/{/g, "").trim(),
                                    "."
                                ).filter(z => z).map(z => "." + z);

                                let newSelectorSplit = [];
                                let skip = false;
                                selectorSplit.forEach((v, w) => {
                                    if (!skip)
                                        if (w < selectorSplit.length - 1)
                                            if (v.split("").every(c => selectorChars.includes(c)))
                                                if (selectorSplit[w + 1].split("").every(c => selectorChars.includes(c))) {
                                                    newSelectorSplit.push([v, selectorSplit[w + 1]]);
                                                    skip = true;
                                                }
                                    if (!skip)
                                            newSelectorSplit.push([v]);
                                    else
                                        skip = false;
                                });

                                cssObj.push({
                                    selectors: newSelectorSplit,
                                    cssText: bodySoFar
                                        .replace(/[\t\n\r]/g, "")
                                        .slice(0, -1)
                                        .trim()
                                })
                            });

                            matchSoFar = "";
                            bodySoFar = "";
                        }
                    } else {
                        matchSoFar += char;
                        if (char === "{")
                            inBracket = true;
                        else if (char === "\n")
                            matchSoFar = "";
                    }
                }
            } else if (css[i - 1] + char === "*/")
                inComment = false;
        }

        return cssObj;
    }

    function toCSS(cssObj) {
        let writeStr = "";
        cssObj.forEach(selector => {
            writeStr += selector.selectors.map(b => b.join('')).join('') + "{" + selector.cssText + "}";
        });

        return writeStr.replace("( {2,})|(\n{2,})|(\t{2,})", "");
    }

    if (fs.existsSync("dist/ffau.css"))
        fs.unlinkSync("dist/ffau.css");

    function themify(list) {
        return list
            .map(f => "./src/themes/" + f)
            .filter(f => fs.existsSync(f) && f.endsWith(".css"));
    }

    let cssFiles = themify(
        fs.readdirSync("src/themes").filter(
            f =>
                !(
                    f.endsWith("__.css") &&
                    f.startsWith("__")
                )
        )
    );

    let globalFiles = themify(
        fs.readdirSync("src/themes").filter(
            f =>
                (
                    f.endsWith("__.css") &&
                    f.startsWith("__")
                )
        )
    );

    let cssData = "";

    globalFiles.forEach(filename => {
        filename === "./src/themes/__styles__.css" ?
            cssData += "\n\n/*Global Ffau styles*/\n" :
            cssData += "\n\n/*Global styles ("
                + filename.slice(15, -6)
                + ")*/\n";

        cssData += toCSS(toJSON(filename));
    });

    cssData += "\n\n";

    cssFiles.forEach(filename => {
        let json = toJSON(filename);
        let newObj = json;

        let cssFileName = filename.split("/").slice().pop().slice(0, -4);

        json.forEach((key, i) => {
            let newKey = key;

            key.selectors.forEach((selector, b) => {
                if ([".blocklyToolboxDiv", ".blocklyTreeRoot", ".blocklyTreeRow", ".blocklyHidden",
                    ".blocklyTreeLabel", ".blocklyTreeIcon", ".blocklyTreeIconClosedLtr", ".blocklyTreeIconNone",
                    ".blocklyTreeSeparator", ".blocklySvg", ".blocklyWorkspace", ".blocklyMainBackground",
                    ".blocklyTrash", ".blocklyBlockCanvas", ".blocklyBubbleCanvas", ".blocklyScrollbarBackground",
                    ".blocklyZoom", ".blocklyScrollbarVertical", ".blocklyMainWorkspaceScrollbar", ".blocklyScrollbarHandle",
                    ".blocklyScrollbarHorizontal", ".blocklyFlyout", ".blocklyFlyoutBackground", ".blocklyFlyoutScrollbar",
                    ".blocklyBlockDragSurface", ".blocklyWsDragSurface", ".blocklyOverflowVisible", ".blocklyWidgetDiv",
                    ".blocklyTooltipDiv", ".blocklyText"]
                    .some(prefix => selector.some(g => g.startsWith(prefix))))
                    newKey.selectors[b] = ["div.injectionDiv.blocklyTheme"
                    + cssFileName.charAt(0).toUpperCase()
                    + cssFileName.slice(1)
                    + " " + selector.join("")];
                newKey.selectors[b] = newKey.selectors[b].map(g =>
                    g.startsWith(".themify") ?
                        "div.injectionDiv.blocklyTheme"
                        + cssFileName.charAt(0).toUpperCase()
                        + cssFileName.slice(1) + " " :
                        g
                );
            });

            newObj[i] = newKey;
        });

        let cssStr = toCSS(newObj);
        cssData += "\n\n/*Theme '" + cssFileName + "'*/\n"
            + cssStr
            + ".verifyBlocklyTheme"
            + cssFileName.charAt(0).toUpperCase() + cssFileName.slice(1)
            + "::before{content:'verify-"
            + cssFileName
            + "';}"
    });

    let writeStr = ["/*\n",
        "\tTHIS FILE IS AUTO-GENERATED BY `gulpfile.js:compileStyles()`. DO NOT TAMPER MANUALLY:\n",
        "\t\tEDIT THE FILES IN `./src/themes` AND RUN `gulp` FROM PROJECT ROOT\n",
        "\nThis version generated: " + new Date().toISOString(),
        "\n*/\n",
        cssData].join("");

    fs.writeFile("./dist/ffau.css",
        writeStr
        , err => {
            if (err) throw "Write failed with error: \n" + err;

            console.log("Success! See `dist/ffau.css` for output code, or use:");
            console.log('\t<link href="dist/ffau.css" rel="stylesheet">');
            console.log('in the <head> of your HTML file to import the new themes.');
        });

    cb();
}

exports.default = compileStyles;