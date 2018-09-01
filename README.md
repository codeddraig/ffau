<h1 align="center">FFAU</h1>
<p align="center"><img src="https://img.shields.io/badge/version-0.3.1-brightgreen.svg"></p>
<p align="center">Ffau - A blocky-based editor for teaching HTML, CSS and Javascript.</p>
<p align="center">Developed by Pal Kerecsenyi, Geza Kerecsenyi and tti0 (https://github.com/tti0).</p>

## Information
General contact: **ffau [at] codei0 [dot] net**

Live demo: https://codeddraig.github.io/ffau/

## CodeDragon

Ffau forms part of the CodeDragon ecosystem, a platform for teaching young people to code for the web. Check us out at https://codedragon.org

## License info

Ffau is open source software. This means you can re-mix, share and use it however you want, including for commercial purposes. However, you MUST provide attribution to the original authors if you do this. However, Ffau is provided with NO WARRANTY whatsoever, and by using this software, you agree to the terms of the MIT License.

For full details, please read LICENSE.

Copyright (c) 2017-18 Pal Kerecsenyi, Geza Kerecsenyi and tti0 (https://github.com/tti0)

## Setup
The Ffau editor is made to be easily addable to any existing project. There are 4 main steps to setting the Ffau up for a simple project like the one linked above.

1. Clone this repo into your project's equivalent of the `assets` directory - any nice, static place will do.

```
git clone https://github.com/codeddraig/ffau.git
```

2. Import our libraries in a specific order. Due to Blockly being our main dependency, you have to import our assets quite specifically. Here's a perfect example (all file paths are relative to the root of this repo):

```html
<head>
    <!-- google's blockly stuff first -->
    <script src="library/blockly/google-blockly/blockly_compressed.js"></script>
    <script src="library/blockly/google-blockly/msg/js/en.js"></script>

    <!-- jquery (you probably already have it imported, but make sure you've got at least v3.2.1) -->
    <script src="library/jquery/jquery-3.2.1.js"></script>

    <!-- our blockly blocks and generators -->
    <script src="library/blockly/html/blocks.js"></script>
    <script src="library/blockly/html/generator.js"></script>

    <!-- ace editor (optional: if you want a syntax-highlighted code preview) -->
    <script src="library/ace/src-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>

    <!-- ffau js last -->
    <script src="dist/ffau.js"></script>
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
        document.getElementById("toolbox") // XML toolbox
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

You can find documentation for all functions in the `Ffau` class at https://codeddraig.github.io/ffau/docs/Ffau.html.

## Export
Ffau can save your blocks to a text file in the browser (with the extension '.txt') and import them to re-assemble your blocks. Files exported from Ffau can be imported to CodeDragon (https://codedragon.org), and vice-versa.

## Bugs
To report problems or potential additions, please feel free to visit the 'issues' section of this repo. For security issues, please email us at: **ffau [at] codei0 [dot] net**.

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

### tti0 // https://github.com/tti0 // https://tti0.net

### Pal Kerecsenyi // https://github.com/palkerecsenyi

### Geza Kerecsenyi // https://github.com/gezakerecsenyi

Please direct all correspondence to **ffau [at] codei0 [dot] net**
