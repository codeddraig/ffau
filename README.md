<h1 align="center">FFAU</h1>
<p align="center"><img src="https://img.shields.io/badge/version-2.0.0-brightgreen.svg"></p>
<p align="center">Ffau - A Blockly-based editor for teaching HTML and CSS.</p>
<p align="center">Developed by Pal Kerecsenyi and Geza Kerecsenyi.</p>

## Information
General contact: **contact@codedragon.org**

Live demo: https://codeddraig.github.io/ffau/

## CodeDragon

Ffau forms part of CodeDragon, a platform for teaching young people to code for the web with real-life HTML and CSS. Check it out at https://codedragon.org.

## License info

Ffau is open source software. This means you can clone, share and use it however you want, including for commercial purposes. However, you MUST provide attribution to the original authors if you do this. However, Ffau is provided with NO WARRANTY whatsoever, and by using this software, you agree to the terms of the MIT License.

For full details, please read LICENSE.

Copyright (c) 2017-19 The CodeDdraig Organisation

## Setup
The Ffau editor is made to be easily addable to any existing project. There are 4 main steps to setting the Ffau up for a simple project like the one linked above.

1. Find the latest version on jsDelivr (this version: 2.1.3)

2. Import our libraries in a specific order, using the jsDelivr links:

```html
<head>
    <!-- google's blockly stuff first -->
    <script src="https://cdn.jsdelivr.net/gh/google/blockly@3.20200402.1/blockly_compressed.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/google/blockly@3.20200402.1/msg/js/en.js"></script>

    <!-- jquery (you probably already have it imported, but make sure you've got at least v3.2.1) -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js"></script>

    <!-- our blockly blocks and generators -->
    <script src="https://cdn.jsdelivr.net/npm/@codeddraig/ffau-editor@2.1.3/library/ffau/blocks.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@codeddraig/ffau-editor@2.1.3/library/ffau/generator.min.js"></script>

    <!-- ace editor (optional: if you want a syntax-highlighted code preview) -->
    <script src="https://cdn.jsdelivr.net/npm/ace-builds@1.4.7/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>

    <!-- ffau css -->
    <script src="https://cdn.jsdelivr.net/npm/@codeddraig/ffau-editor@2.1.3/dist/ffau.css"></script>
    <!-- ffau js last -->
    <script src="https://cdn.jsdelivr.net/npm/@codeddraig/ffau-editor@2.1.3/dist/ffau.min.js"></script>
</head>

<body>

    <!-- some elements need to go here, see step 3 -->

    <script>
        // Your JS goes at the bottom of <body>
        const ffau = new Ffau();
    </script>
</body>
```

3. Add the toolbox and pick which Ffau components you want to use. We won't explain how the toolbox works in too much detail, but it's simply a bit of XML that defines which blocks should go in your toolbox, and how to arrange them.

**See BLOCKS.md for a full list of XML blocks**

 Here's an example using all Ffau components and three blocks:

```html
<body>
    <!-- blockly container, must have fixed height & width -->
    <div id="blockly" style="height: 480px; width: 100%;"></div>

    <!-- iframe container -->
    <div id="frame-preview"></div>

    <!-- ace container, also must have fixed dimensions -->
    <div id="code-preview" style="height: 480px; width: 100%;"></div>

    <!-- style="display: none;" is important! Otherwise, XML would try to render as HTML -->
    <xml id="toolbox" style="display: none;">
        <block type="body"></block> <!-- <body> -->
        <block type="paragraph"></block> <!-- <p> -->
        <block type="emptytext"></block> <!-- empty text to go inside paragraph -->
    </xml>
</body>
```

 The quick way of rendering all blocks at once is using `Ffau.renderToolbox()`. This will use the built-in, recommended layout for the toolbox, although it is more difficult to customise. We refer all users to the manual XML approach in almost all cases, except when there is a reason to use this function: for instance, when using frameworks like React wherein using non-standard HTML tags would be very difficult.
 
 The standard usage, to import the entire toolbox with recommended categories, is simply as follows:
 
 ```html
<script>
    ffau.renderToolbox(document.body, 'toolbox', ['all'])
    //                 ^ where to render it
    //                                ^ the ID of the element to render it into
    //                                            ^ what to render
</script>
 ```
 
 However, the `Ffau.renderToolbox` function _does_ support a selection of simple solutions to basic toolbox layout, although these all are simple filters of the recommended layout. In the place of `['all']` you could specify either a specific [set of] category(s) by their label:
 
 ```js
ffau.renderToolbox(document.body, 'toolbox', [{name: 'Structure', categories: ['all']}])
```

or subcategories:

```js
ffau.renderToolbox(document.body, 'toolbox', [{name: 'Organisation', categories: ['Lists', 'Summary']}])
```

...and so on. Alternatively, you can specify block names using the fourth parameter, although no fancy constructs are allowed here as of yet:

```js
ffau.renderToolbox(document.body, 'toolbox', null, ['head', 'html']);
```

The method also returns the HTML source, so you can miss out the first parameter if you want and do whatever with the raw source:

```js
const toolboxHtml = ffau.renderToolbox(null, 'toolbox', null, ['html', 'style']);
myCustomHandler(toolboxHtml);
```

4. Render all components using ffau.js. If your page is the same as the one shown in step 3, you can put this at the bottom of your body:

```html
<script>
    const ffau = new Ffau();

    // must come first, renders the Blockly interface
    ffau.renderBlockly(
        document.getElementById("blockly"), // container to put blockly in
        document.getElementById("toolbox"), // XML toolbox
        "panda", // Optional - the name of the theme to default to.
    );
    
    // Add settings dialogue - a button that appears on the right 
    // hand side of the Ffau and opens into a window providing
    // implementation-specific options and callbacks to update
    // the linked options, e.g a theme switcher or auto-save toggle.
    ffau.addSettings([
        {
            name: "theme",
            label: "Theme",
            type: "dropdown",
            options: [
                ["Panda", "panda"],
                ["Dark", "dark"],
                ["Light", "light"]
            ],
            callback: (value) => {
                ffau.setTheme(value); // Set the theme for the Ffau editor
            }
        },
        {
            name: "ace_theme",
            label: "Editor theme",
            type: "dropdown",
            default: "1",
            options: [
                ["Light", "0"],
                ["Dark", "1"]
            ],
            callback: (value) => {         // Set the theme for the Ace editor
                if (value === "0") {
                    ffau.editor.setOptions({
                        theme: "ace/theme/dawn"
                    });
                } else {
                    ffau.editor.setOptions({
                        theme: "ace/theme/tomorrow_night"
                    });
                }
            }
        },
        {
            name: "font_size",
            label: "Ace font size",
            type: "numeric",
            default: "16",
            callback: (value) => {         // Set Ace editor font size/demonstrate numeric input
                ffau.editor.setOptions({
                    fontSize: value
                });
            }
        }
    ], 
        1 // Set loose auto-closing (auto-close settings menu if focus is shifted to elsewhere in editor)
    );


    // renders iframe preview
    ffau.renderPreview(
        document.getElementById("frame-preview") // container to put iframe in
    );

    // renders the ace editor
    ffau.renderCode(
        ace, // pass the window.ace object to this function, just to make sure it works
        document.getElementById("code-preview") // container to put ace in
    );

    // Now that everything has been rendered, you need to add a change listener to Blockly.
    // This will make the contents of the code and frame previews update whenever Blockly does.
    ffau.addEvent();

    // That's it!
</script>
```

You can find documentation for all functions in the `Ffau` class at https://codeddraig.github.io/ffau/docs/Ffau.html. **More examples of further customisations can be found in [the example file](index.html)**, which includes further demonstrations of the settings dialogue and theme switching.

## Customisation

If you wish to customise the styles of the Ffau, this can be done using the [Gulp](https://gulpjs.com/) builder which compiles all of your semantic files (for each theme) into a single, partially-minified master CSS file to reduce the number of files you have to import manually.

The raw source files for the themes can be found in `src/themes`. Any file given a name pre- and proceeded by double underscores, such as `__my_css_file__.css` ('global stylesheets') will simply be minified, given a header and otherwise left untouched in the compiled file. Any file without the underscores will be assumed to be a Ffau theme file. The name of the theme, when referenced by the Ffau JS library, will be the name of the file. For example, if you make a file `src/themes/my_theme.css`, you will then be able to do `ffau.setTheme("my_theme")` in your script.

Once you are done with your editing, compile all of the styles by running the command `gulp` from the project root. This should run in less than 20ms, and place the output file `ffau.css` into `./dist`. 

#### (Current) limitations
    
* The minification is not perfect. This is not a priority, since the minification is not a crucial effect of the builder, but it is to be noted.

* Global stylesheets have a lower precedence than style files, unless `!important` or other manual priorities are stated.

* There is no feature, currently, to use manual class names that get replaced with their theme-ified versions. However, a workaround is to use the `.themify` selector, which will note to the builder to append the relevant theme selector, e.g `.themify .my-custom-class`. The settings dialogues can also be styled in this way, e.g `.themify .settings-button`.

* Class names with escaped characters is **not** supported. The compiler will not crash, although some specific features like multi-class selectors (e.g `.write\&test.testing`) may be thrown off. There is no known available workaround.

* The build operation will overwrite any pre-existing file of the same name without warning. If you are testing, save backups of the stylesheets if you are not using an IDE that supports history management/UNDO.

## Export
Ffau can save your blocks to a text file in the browser (with the extension '.txt') and import them to re-assemble your blocks. Files exported from Ffau can be imported to CodeDragon (https://codedragon.org), and vice-versa.

## Reverse-coding
Our Blockly implementation has one added method `Ffau.codeToXml`, which takes a single argument of HTML/CSS source code, and returns the XML source which can be loaded into Blockly. Using `Ffau.addEvent()`, we can implement a 'reverse-coding' system which allows us to toggle between the editing modes (blocks or text):

```javascript
ffau.addEvent(() => {
        if (ffau.editMode) { // Check if we are in typing mode
            try {
                ffau.setXML(
                    ffau.codeToXML(
                        ffau.editor.getValue() // Get the text in the Ace editor
                    )                          // Call `Ffau.codeToXML` to get XML source
                );                             // Pass source to Blockly

                // Clean up blocks (omitting this will result in all of the blocks being overlayed)
                ffau.ffauWorkspace.cleanUp();
                ffau.ffauWorkspace.scrollCenter(); // The rearranged blocks may have a different center, so re-center the view
            } catch (e) { // Ffau.codeToXML can throw errors with invalid or empty HTML
                ffau.clearWorkspace(); // in this case, just revert to a blank workspace
            }
        }
    }, 'ace'); // Add as an event to Ace editor as defined in latest `Ffau.renderCode` call or manually (`ffau.editor = ace`)
```

Note the use of `ffau.editMode` - this is a simple boolean property which is either true or false to represent typing and block mode respectively. This can be toggled using `Ffau.toggleEditMode()`

#### Features

The reverse-coding implementation supports:

- Basic HTML, including tags, nesting, and attributes.
- Non-standard HTML expansion, e.g allowing for self-closing tags and implicit tags (e.g <img>, which doesn't have a closing tag or a self-closing slash)
- HTML & CSS comments
- CSS, including selectors (with fancy pseudoselectors being rendered as their separate blocks), properties and values, as well as the HTML `style` attribute
- CSS colours, chosen to best fit entered text (e.g if `red` is entered, which is in the color picker, the color picker is used; if `mintgreen` is entered, the HEX picker will be used instead)
- Coding mode can be toggled, to trigger natively-supported reverse-coding events.
- Proper, rigorous string interpolation in HTML and CSS

### Limitations

The only feature *not supported by reverse coding* is *snippets* - take care that toggling the edit mode twice in a row will remove all snippets from the workspace.

## Bugs
To report problems or potential additions, please feel free to visit the 'issues' section of this repo. For security issues, please email us at: **contact@codedragon.org**.

## Libraries
This project would not be possible without the following amazing libraries. We are much indebted to them for their support and work:

### jQuery (http://jquery.com/)
The JavaScript library which handles DOM transversals and event handling with far more grace and ease than pure JavaScript. It is also a requirement for other libraries used in this project.

### Blockly by Google (https://github.com/google/blockly)
A magic library which you may have heard of by now. It creates the whole drag-and-drop block system (excluding the reverse-coding system), which is the basis for this entire system!

### Magic.css by Pal Kerecsenyi (https://github.com/palkerecsenyi/magic)
CSS library for everything but the editor itself. Developed by one of our own team!

### Ace Editor (https://ace.c9.io/)
Handles syntax highlighting in the "Real Code" tab.

### Music by Kevin MacLeod (http://incompetech.com)
"Dance of the Sugar Plum Fairy", "Monkeys Spinning Monkeys", "Pixelland" - (Licensed under Creative Commons: By Attribution 3.0 (http://creativecommons.org/licenses/by/3.0/))

### Video by the Open Movie Foundation (http://blender.org)
**Trailer for "Big Buck Bunny"** and **"Llama Drama, Episode 1"**.

## Inspiration
Our project is inspired by, but not a direct clone of, the blockly-html project (https://github.com/bwinf/blockly-html) by the BWNIF (Bundesweit Informatik Nachwuchs Fördern), a German organisation which seeks to further development in Computer Science among children. Also, we note some similarities to the amazing EduBlocks project (https://github.com/AllAboutCode/EduBlocks) by Joshua Lowe, which performs a similar function to that of this library, but for Python, rather than the web.

## Developers

### Pal Kerecsenyi // https://github.com/palkerecsenyi

### Geza Kerecsenyi // https://github.com/gezakerecsenyi

