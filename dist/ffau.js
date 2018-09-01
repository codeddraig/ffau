/*
        Ffau - A blocky-based editor for teaching HTML, CSS and Javascript.

				Developed by Pal Kerecsenyi, Geza Kerecsenyi and Theodore Tucker.
				Full details are avaliable at the Github repo: https://github.com/codeddraig/ffau
				Ffau editor will not work without its libraries. The best way to get all
					off this data at once is to grab the latest release version from the
					Github repo.
				Ffau is open source software. This means you can re-mix, share and use
					it however you want, including for commercial purposes. However, you
					MUST provide attribution to the original authors if you do this.
				However, Ffau is provided with NO WARRANTY whatsoever, and by using this
					software, you agree to the terms of the MIT License.

				Copyright (c) 2017-18 Pal Kerecsenyi, Geza Kerecsenyi and tti0 (https://github.com/tti0)

				THIS IS VERSION 0.3.1
*/

/* jshint esversion:6 */

(function(){
    "use strict";
    Blockly.HSV_SATURATION = 1;
    Blockly.HSV_VALUE = 0.7;
}());

class Ffau{

    constructor(){
        console.log("=========================");
        console.log('%c Ffau Editor ', 'background: #00d1b2; color: white;');
        console.log("A Blockly-based HTML editor made by the CodeDdraig organisation.");
        console.log("https://codedragon.org");
        console.log("=========================\n");
    }

    /**
     * [private] Generate an ID for a ffau component
     * @param {HTMLElement} object - The element to generate an ID for
     * @param {string} objectType - The name of the component
     * @returns {*|string}
     */
    static generateID(object, objectType){
        return object.id || "ffau-" + objectType + "-" + Math.floor(Math.random() * 10000);
    }

    /**
     * Inject the blockly editor (should be called first)
     * @param {HTMLElement} frame - The frame to put the editor in
     * @param {HTMLElement} toolbox - The XML toolbox
     * @returns {*}
     */
    renderBlockly(frame, toolbox){
        // generate a random ID for the frame to avoid duplication
        frame.id = Ffau.generateID(frame, 'blockly');

        // inject blockly
        this.ffauWorkspace = Blockly.inject(frame.id, {
            toolbox: toolbox,
            zoom: {
                controls:true,
                wheel:true,
                startScale: 1.0,
                maxScale: 3,
                minScale: 0.3,
                scaleSpeed:1.2
            },
            trashcan: true
        });

        return frame.id;
    }

    /**
     * Render the iframe preview
     * @param {HTMLElement} frame - The frame to put the preview in
     * @returns {HTMLElement} - The generated iframe
     */
    renderPreview(frame){
        // generate a random id to avoid duplication
        frame.id = Ffau.generateID(frame, 'iframe');

        // set the innerhtml of the frame specified
        frame.innerHTML = `<iframe style="height:inherit;width:inherit;" id="${frame.id}-iframe"></iframe>`;

        // save the frame for later use
        this.iframe = document.getElementById(frame.id + '-iframe');
        return this.iframe;
    }

    /**
     * Render the code preview
     * @param {object} ace - The imported ace variable from the Ace library
     * @param {HTMLElement} frame - The frame to put the editor in
     * @param {string} [aceTheme=ace/theme/textmate] - The theme to use for Ace
     * @returns {object} - The editor
     */
    renderCode(ace, frame, aceTheme){
        // set the id to the current ID or a random one
        frame.id = Ffau.generateID(frame, 'ace');

        // init the editor by frame id
        const editor = ace.edit(frame.id);

        // set the theme
        editor.setTheme(aceTheme || "ace/theme/textmate");

        // set other ace options
        editor.session.setMode("ace/mode/html");
        editor.setReadOnly(true);
        editor.setValue("");

        // save editor for use in event listener
        this.editor = editor;
        return this.editor;
    }

    // blockly change listener
    addEvent(){
        // add listener to workspace
        this.ffauWorkspace.addChangeListener(function(){
            // generate the code using htmlGen from generator.js
            let code = htmlGen.workspaceToCode(this.ffauWorkspace);

            // if ace has been initialised (doesn't have to be)
            if(this.editor){
                // set the ace editor value
                this.editor.setValue(code, -1 /* set the cursor to -1 to stop highlighting everything */ );
            }

            // if iframe has been initialised
            if(this.iframe){
                this.iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
            }
        }.bind(this) /* bind parent scope */ );
    }
}