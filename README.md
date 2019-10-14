<h1 align="center">FFAU</h1>
<p align="center"><img src="https://img.shields.io/badge/version-0.3.1-brightgreen.svg"></p>
<p align="center">Ffau - A blocky-based editor for teaching HTML, CSS and Javascript.</p>
<p align="center">Developed by Pal Kerecsenyi, Geza Kerecsenyi and Oli Plant.</p>

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

1. Clone this repo into your project's equivalent of the `assets` directory - any nice, static place will do.

```
git clone https://github.com/codeddraig/ffau.git
```

2. Import our libraries in a specific order. Due to Blockly being our main dependency, you have to import our assets quite specifically. Here's a perfect example (we'll assume you've cloned Ffau into `./assets/ffau`):

```html
<head>
    <!-- google's blockly stuff first -->
    <script src="assets/ffau/library/blockly/google-blockly/blockly_compressed.js"></script>
    <script src="assets/ffau/library/blockly/google-blockly/msg/js/en.js"></script>

    <!-- jquery (you probably already have it imported, but make sure you've got at least v3.2.1) -->
    <script src="assets/ffau/library/jquery/jquery-3.2.1.js"></script>

    <!-- our blockly blocks and generators -->
    <script src="assets/ffau/library/blockly/html/blocks.js"></script>
    <script src="assets/ffau/library/blockly/html/generator.js"></script>

    <!-- ace editor (optional: if you want a syntax-highlighted code preview) -->
    <script src="assets/ffau/library/ace/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>

    <!-- ffau css -->
    <link rel="stylesheet" href="assets/ffau/dist/ffau.css">
    <!-- ffau js last -->
    <script src="assets/ffau/dist/ffau.js"></script>
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
    ]);


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

If you wish to customise the styles of the Ffau, this can be done using the [Gulp](https://gulpjs.com/) builder which compiles all of your semantic files (for each theme) into a single, minified master CSS file to reduce the number of files you have to import manually.

The raw source files for the themes can be found in `src/themes`. Any file given a name pre- and proceeded by double underscores, such as `__my_css_file__.css` will simply be minified, given a header and otherwise left untouched in the compiled file. Any file without the underscores will be assumed to be a Ffau theme file. The name of the theme, when referenced by the Ffau JS library, will be the name of the file. For example, if you make a file `src/themes/my_theme.css`, you will then be able to do `ffau.setTheme("my_theme")` in your script.

Once you are done with your editing, compile all of the styles by running the command `gulp` from the project root. This should run in less than 20ms, and place the output file `ffau.css` into `./dist`. 

_Note that this operation will overwrite any pre-existing file of the same name without warning. If you are testing, save backups of the stylesheets if you are not using an IDE that supports history management/UNDO._

## Export
Ffau can save your blocks to a text file in the browser (with the extension '.txt') and import them to re-assemble your blocks. Files exported from Ffau can be imported to CodeDragon (https://codedragon.org), and vice-versa.

## Bugs
To report problems or potential additions, please feel free to visit the 'issues' section of this repo. For security issues, please email us at: **contact@codedragon.org**.

## Libraries
This project would not be possible without the following amazing libraries. We are much indebted to them for their support and work:

### jQuery (http://jquery.com/)
The JavaScript library which handles DOM transversals and event handling with far more grace and ease than pure JavaScript. It is also a requirement for other libraries used in this project.

### Blockly by Google (https://github.com/google/blockly)
A magic library which you should have heard of by now. It creates the whole drag-and-drop block system, which is the basis for this entire system!

### Magic.css by Pal Kerecsenyi (https://github.com/palkerecsenyi/magic)
CSS library for everything but the editor itself. Developed by one of our own team!

### Ace Editor (https://ace.c9.io/)
Handles syntax highlighting in the "Real Code" tab.

### Music by Kevin MacLeod (http://incompetech.com)
"Dance of the Sugar Plum Fairy", "Monkeys Spinning Monkeys", "Pixelland" - (Licensed under Creative Commons: By Attribution 3.0 (http://creativecommons.org/licenses/by/3.0/))

### Video by the Open Movie Foundation (http://blender.org)
**Trailer for "Big Buck Bunny"** and **"Llama Drama, Episode 1"**.

## Inspiration
Our project is inspired by, but not a direct clone of, the blockly-html project (https://github.com/bwinf/blockly-html) by the BWNIF (Bundesweit Informatik Nachwuchs Fördern), a German organisation which seeks to further development in Computer Science among children. Also, we owe some of our inspiration to the EduBlocks project (https://github.com/AllAboutCode/EduBlocks) by Joshua Lowe, which performs a similar function to our work, but for Python, rather than the web.

## Developers

### Oli Plant // https://github.com/ddevlop

### Pal Kerecsenyi // https://github.com/palkerecsenyi

### Geza Kerecsenyi // https://github.com/gezakerecsenyi

