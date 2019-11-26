/*
        Ffau - A blocky-based editor for teaching HTML, CSS and Javascript.

				Developed by Pal Kerecsenyi, Geza Kerecsenyi and Oli Plant.
				Full details are avaliable at the Github repo: https://github.com/codeddraig/ffau
				Ffau editor will not work without its libraries. The best way to get all
					off this data at once is to grab the latest release version from the
					Github repo or to install via NPM.
				Ffau is open source software. This means you can re-mix, share and use
					it however you want, including for commercial purposes. However, you
					MUST provide attribution to the original authors if you do this.
				However, Ffau is provided with NO WARRANTY whatsoever, and by using this
					software, you agree to the terms of the MIT License.

				Copyright (c) 2017-19 The CodeDdraig Organisation

				THIS IS VERSION 1.0.0
*/

/* jshint esversion:6 */

/**
 * Creates a Font Awesome icon from the name of the icon.
 *
 * @param icon
 * @returns {HTMLElement} - the newly-created <i> FA node
 */
function fontAwesome(icon) {
    let elem = document.createElement("i");
    elem.className = "fas fa-" + icon;
    return elem;
}

(function () {
    "use strict";
    Blockly.HSV_SATURATION = 1;
    Blockly.HSV_VALUE = 0.7;
}());

const colorNames = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige', 'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite', 'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum', 'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'].map(e => e.toLowerCase());
const colorValues = ['f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff', 'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2', 'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50', '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b', 'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b', '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000', 'e9967a', '8fbc8f', '483d8b', '2f4f4f', '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff', '696969', '696969', '1e90ff', 'b22222', 'fffaf0', '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520', '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4', 'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5', '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff', 'fafad2', 'd3d3d3', 'd3d3d3', '90ee90', 'ffb6c1', 'ffa07a', '20b2aa', '87cefa', '778899', '778899', 'b0c4de', 'ffffe0', '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa', '0000cd', 'ba55d3', '9370db', '3cb371', '7b68ee', '00fa9a', '48d1cc', 'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5', 'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500', 'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee', 'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd', 'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1', '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d', 'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa', '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347', '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00', '9acd32'];

const cssUnits = ["em", "ex", "ch", "rem", "vw", "vh", "vmin", "vmax", "%", "cm", "mm", "in", "px", "pt", "pc"];

/**
 * @class Class representing a Ffau instance, including all components.
 */
class Ffau {
    /**
     * @typedef {"boolean" | "dropdown"} settingsType
     */

    /**
     * @typedef {"panda" | "light" | "dark"} ffauTheme
     */

    /**
     * @typedef {Object[]} settingsDialogueType - Customisable options to be loaded into settings flyout.
     * @param {string} settings[].label - The label of the setting; the text to be displayed above it
     * @param {string} settings[].name - The internal name of the setting. Can be used to refer to it when manually setting its value.
     * @param {settingsType} settings[].type - The format type of the setting
     * @param {boolean} settings[].default - Required only if using type 'boolean' to specify default boolean value. If not specified, false is used.
     * @param {Array<string[]>} [settings[].options] - Length: 2. Required only if using type 'dropdown' to specify dropdown values. The first item should be the human-readable name of the dropdown item; the second should be the machine value that gets returned to the callback. Omitting the second item will set the returned value to the plain-text one.
     * @param {settingChangeCallback} settings[].callback - Will be called for each setting after settings menu is fully initialised with initial value, as well as whenever a setting is updated.
     **/

    /**
     * @callback settingChangeCallback
     * @param {string} newValue - The new value of the setting
     **/

    /**
     * Initialise the Ffau instance in the document
     */
    constructor() {
        console.log("=========================");
        console.log('%c Ffau Editor ', 'background: #00d1b2; color: white;');
        console.log("A Blockly-based HTML editor made by the CodeDdraig organisation.");
        console.log("https://github.com/codeddraig/ffau");
        console.log("=========================\n");
    }

    /**
     * Generate an ID for a ffau component
     *
     * @param {HTMLElement} object - The element to generate an ID for
     * @param {string} objectType - The name of the component
     * @returns {string}
     */
    static generateID(object, objectType) {
        return object.id || "ffau-" + objectType + "-" + Math.floor(Math.random() * 10000);
    }

    updateSettings(updaters) {
        if (this.hasSettings) {
            let updateList = Array.from(Object.keys(updaters));
            updateList.forEach(e => {
                let settingIndex = -1;
                this.settings.forEach((s, i) => {
                    if (s.name === e) {
                        settingIndex = i;
                    }
                });

                if (settingIndex === -1) {
                    console.warn("Setting `" + e + "` is not defined; skipping.")
                } else {
                    this.settings[settingIndex].value = updaters[e];
                    this.settings[settingIndex].propagateValue(updaters[e]);
                    this.settings[settingIndex].callback(updaters[e]);
                }
            });
        }
    }

    /**
     * Open the settings dialogue (if it exists)
     *
     * @param {boolean} [force] - Force the animation or not (default false) - if false, if the window is already open nothing will happen. Otherwise, the animation will play assuming the window was closed.
     */
    openSettingsMenu(force) {
        if (!this.settingsDiv) {
            console.warn("Cannot open settings dialogue as it has not yet been initialised.");
            return false;
        }

        if (!force && this.settingsOpen)
            return true;

        let popout = this.workspaceDiv.getElementsByClassName("settings-button")[0];
        let settingsWindow = this.workspaceDiv.getElementsByClassName("settings-window")[0];
        let settingsWindowFiller = this.workspaceDiv.getElementsByClassName("settings-window-filler")[0];

        popout.classList.remove('closed');
        settingsWindow.classList.remove('closed');
        settingsWindowFiller.classList.remove('closed');

        popout.classList.add('opening');
        settingsWindow.classList.add('opening');
        settingsWindowFiller.classList.add('opening');

        popout.style.paddingRight = "10px !important";

        window.setTimeout(() => {
            popout.classList.remove('opening');
            settingsWindow.classList.remove('opening');
            settingsWindowFiller.classList.remove('opening');

            popout.classList.add('open');
            settingsWindow.classList.add('open');
            settingsWindowFiller.classList.add('open');

            popout.style.paddingRight = "";
            this.settingsOpen = true;
        }, 120);
    }

    /**
     * Close the settings dialogue (if it exists)
     *
     * @param {boolean} [force] - Force the animation or not (default false) - if false, if the window is already closed nothing will happen. Otherwise, the animation will play assuming the window was open.
     */
    closeSettingsMenu(force) {
        if (!this.settingsDiv) {
            console.warn("Cannot close settings dialogue as it has not yet been initialised.");
            return false;
        }

        if (!force && !this.settingsOpen)
            return true;

        let popout = this.workspaceDiv.getElementsByClassName("settings-button")[0];
        let settingsWindow = this.workspaceDiv.getElementsByClassName("settings-window")[0];
        let settingsWindowFiller = this.workspaceDiv.getElementsByClassName("settings-window-filler")[0];

        popout.classList.remove('open');
        settingsWindow.classList.remove('open');
        settingsWindowFiller.classList.remove('open');

        popout.classList.add('closing');
        settingsWindow.classList.add('closing');
        settingsWindowFiller.classList.add('closing');

        window.setTimeout(() => {
            popout.classList.remove('closing');
            settingsWindow.classList.remove('closing');
            settingsWindowFiller.classList.remove('closing');

            popout.classList.add('closed');
            settingsWindow.classList.add('closed');
            settingsWindowFiller.classList.add('closed');

            this.settingsOpen = false;
        }, 220);
    }

    /**
     * Removes the settings menu, or returns false if settings menu does not exist.
     *
     * @returns {boolean} success
     */
    removeSettings() {
        if (this.hasSettings) {
            this.settingsDiv.parentNode.removeChild(this.settingsDiv);

            delete this.settingsDiv;
            delete this.settings;
            delete this.settingsOpen;

            this.hasSettings = false;
            return true;
        } else {
            console.warn("Cannot delete settings dialogue as it has not yet been initialised.");
            return false;
        }
    }

    /**
     * Add the settings popout to the Blockly container
     *
     * @param {settingsDialogueType} settings
     * @param {number} [autoClose] - 0 means no auto-close, 1 means auto-close if focus shifts to elsewhere in editor, 2 means auto-close if focus shifts outside of editor, and 2 means to auto-close if focus leaves settings menu.
     **/
    addSettings(settings, autoClose) {
        if (this.hasSettings)
            this.removeSettings();

        this.settings = [];
        this.hasSettings = true;

        this.workspaceDiv.getElementsByClassName("blocklyScrollbarBackground")[0].style.zIndex = "249";
        this.workspaceDiv.getElementsByClassName("blocklyScrollbarHandle")[0].style.zIndex = "250";

        let popout = document.createElement("div");
        popout.appendChild(fontAwesome("cog cog-icon"));
        popout.className = "settings-button closed";

        let settingsWindow = document.createElement("div");
        settingsWindow.className = "settings-window closed";
        this.settingsDiv = settingsWindow;

        let settingsWindowFiller = document.createElement("div");
        settingsWindowFiller.className = "settings-window-filler closed";

        let settingsHeader = document.createElement("p");
        settingsHeader.innerText = "Editor settings";
        settingsHeader.className = "settings-header";
        settingsWindowFiller.appendChild(settingsHeader);

        popout.addEventListener('click', () => {
            if (popout.classList.contains('closed'))
                this.openSettingsMenu();
            else
                this.closeSettingsMenu();
        });

        settingsWindow.appendChild(settingsWindowFiller);
        settingsWindow.appendChild(popout);

        let settingsList = document.createElement("ul");
        settingsList.className = "settings-list";

        settings.forEach((setting, id) => {
            let label = document.createElement("label");
            label.setAttribute('for', "setting-" + id.toString());
            label.className = "setting-label";
            label.innerText = setting.label;

            let elem = undefined;
            switch (setting.type) {
                case "dropdown":
                    elem = document.createElement("select");
                    elem.className = "settings-select";

                    setting.options.forEach(option => {
                        let optionElem = document.createElement("option");
                        optionElem.innerText = option[0];
                        optionElem.value = option.length > 0 ? option[1] : option[1];
                        elem.appendChild(optionElem);
                    });

                    if (setting.default)
                        elem.value = setting.default;

                    elem.onchange = () => {
                        this.settings.forEach((e, i) => {
                            if (e.name === setting.label)
                                this.settings[i].value = elem.value;
                        });
                        setting.callback(elem.value);
                    };
                    this.settings.push({
                        name: setting.name,
                        value: elem.value,
                        elem,
                        propagateValue: (newValue) => {
                            elem.value = newValue;
                        },
                        callback: elem.onchange
                    });
                    break;

                case "boolean":
                    elem = document.createElement("label");
                    elem.className = "settings-checkbox-container";

                    let checkboxInput = document.createElement("input");
                    checkboxInput.type = "checkbox";
                    checkboxInput.className = "settings-checkbox";
                    checkboxInput.checked = setting.default || false;

                    let span = document.createElement("span");
                    span.className = "settings-slider";

                    elem.appendChild(checkboxInput);
                    elem.appendChild(span);

                    checkboxInput.onclick = () => {
                        this.settings.forEach((e, i) => {
                            if (e.name === setting.label)
                                this.settings[i].value = checkboxInput.checked;
                        });
                        setting.callback(checkboxInput.checked);
                    };
                    this.settings.push({
                        name: setting.name,
                        value: checkboxInput.checked,
                        elem,
                        propagateValue: (newValue) => {
                            checkboxInput.checked = newValue;
                        },
                        callback: checkboxInput.onclick
                    });
                    break;

                case "numeric":
                    elem = document.createElement("input");
                    elem.type = "number";
                    elem.className = "settings-number";
                    elem.value = setting.default || 0;

                    elem.onchange = () => {
                        this.settings.forEach((e, i) => {
                            if (e.name === setting.label)
                                this.settings[i].value = parseInt(elem.value);
                        });
                        setting.callback(parseInt(elem.value));
                    };
                    this.settings.push({
                        name: setting.name,
                        value: elem.value,
                        elem,
                        propagateValue: (newValue) => {
                            elem.value = parseInt(newValue);
                        },
                        callback: elem.onchange
                    });
                    break;
            }

            elem.id = "setting-" + id.toString();

            let li = document.createElement("li");
            li.appendChild(label);
            li.appendChild(elem);

            li.className = "settings-li";

            settingsList.appendChild(li);
        });

        this.settings.forEach(c => c.callback());
        settingsWindow.appendChild(settingsList);

        let workspace = this.workspaceDiv.getElementsByClassName("injectionDiv")[0];
        workspace.prepend(settingsWindow);

        switch (autoClose) {
            case 1:
                window.addEventListener('click', (event) => {
                    if (!event.path.includes(settingsWindow) && event.path.includes(this.workspaceDiv))
                        this.closeSettingsMenu();
                });
                break;
            case 2:
                window.addEventListener('click', (event) => {
                    if (!event.path.includes(this.workspaceDiv))
                        this.closeSettingsMenu();
                });
                break;
            case 3:
                window.addEventListener('click', (event) => {
                    if (!event.path.includes(settingsWindow))
                        this.closeSettingsMenu();
                });
                break;
        }
    }

    /**
     * Inject the blockly editor (should be called first)
     *
     * @param {HTMLElement} frame - The frame to put the editor in
     * @param {HTMLElement} toolbox - The XML toolbox
     *
     * @param {string} theme - The name of the theme to initiate Blockly with.
     * @param {settingsDialogueType} [settings]
     *
     * @param {object} [options] - Custom options for the Blockly editor. Ffau will apply some default options if this is not specified.
     * @returns {*}
     */
    renderBlockly(frame, toolbox, theme, settings, options) {
        // generate a random ID for the frame to avoid duplication
        frame.id = Ffau.generateID(frame, 'blockly');

        let editorOptions = {
            toolbox: toolbox
        };

        if (options) {
            editorOptions = Object.assign(editorOptions, options);
        } else {
            editorOptions = Object.assign(editorOptions, {
                zoom: {
                    controls: true,
                    wheel: true,
                    startScale: 1.0,
                    maxScale: 3,
                    minScale: 0.3,
                    scaleSpeed: 1.2
                },
                trashcan: true
            });
        }

        // inject blockly
        this.ffauWorkspace = Blockly.inject(frame.id, editorOptions);

        this.workspaceDiv = frame;
        this.toolboxDiv = this.workspaceDiv.getElementsByClassName("blocklyToolboxDiv")[0];

        // add settings popout
        if (settings)
            this.addSettings(settings);

        this.setTheme(theme || "panda");

        // Return workspace info
        return this.ffauWorkspace;
    }

    /**
     *
     * Checks if a theme name is a valid Ffau theme, using the CSS-based checking mechanics automatically added by `dist/compile_styles.py`.
     *
     * @param {string} className - The name of the theme
     * @param {boolean} appendPrefix - Specifies the format of the theme name: if true, then a theme in a format like `panda` or `dark` is expected. If false, a full classname, like `blocklyThemePanda` or `blocklyThemeDark` is expected.
     * @returns {boolean} - Whether or not the input refers to a real Ffau theme.
     */
    isFfauTheme(className, appendPrefix) {
        if (!appendPrefix) {
            if (className.split("blocklyTheme").length > 1) {
                className = className.split("blocklyTheme")[1].toLowerCase();
            } else {
                return false;
            }
        }

        let testObj = document.createElement("p");
        testObj.className = "verifyBlocklyTheme" + className[0].toUpperCase() + className.slice(1).toLowerCase();
        testObj.style.display = "none";

        document.body.appendChild(testObj);
        const computedText = getComputedStyle(testObj, ':before')
            .getPropertyValue('content');

        const isGood = computedText.substr(1, computedText.length - 2)
            === 'verify-' + className.toLowerCase();

        testObj.parentNode.removeChild(testObj);

        return isGood;
    }

    /**
     * Render the iframe preview
     *
     * @param {HTMLElement} frame - The frame to put the preview in
     * @returns {HTMLElement} - The generated iframe
     */
    renderPreview(frame) {
        // generate a random id to avoid duplication
        frame.id = Ffau.generateID(frame, 'iframe');

        // set the innerhtml of the frame specified
        frame.innerHTML = `<iframe style="height: inherit; width: inherit;" id="${frame.id}-iframe"></iframe>`;

        // save the frame for later use
        this.iframe = document.getElementById(frame.id + '-iframe');
        return this.iframe;
    }

    /**
     * Set the theme of the Ffau
     *
     * @param {ffauTheme} theme - the name of the theme
     */
    setTheme(theme) {
        const themeClassName = "blocklyTheme" + theme[0].toUpperCase() + theme.slice(1).toLowerCase();

        if (theme === this.theme) return true;  // Save some processing/rendering effort.

        if (!this.isFfauTheme(theme, true)) {
            console.warn("Could not set Ffau theme '" + theme + "' as it is not listed in `dist/ffau.css`");
            return false;
        }

        let injectionDiv = this.workspaceDiv.querySelector("div.injectionDiv");
        const classList = injectionDiv.classList;
        classList.forEach(className => {
            if (this.isFfauTheme(className, false)) {
                injectionDiv.classList.remove(className);
            }
        });
        injectionDiv.classList.add(themeClassName);

        this.theme = theme;
        return true;
    }

    /**
     * Render the code preview
     *
     * @param {object} ace - The imported ace variable from the Ace library
     * @param {HTMLElement} frame - The frame to put the editor in
     * @param {string} [aceTheme=ace/theme/textmate] - The theme to use for Ace
     * @param {boolean} [readOnly] - Should the editor be read only?
     * @returns {object} - The editor object (you can call functions on this to customise Ace)
     */
    renderCode(ace, frame, aceTheme, readOnly) {
        // set the id to the current ID or a random one
        frame.id = Ffau.generateID(frame, 'ace');

        // init the editor by frame id
        const editor = ace.edit(frame.id);

        // set the theme
        editor.setTheme(aceTheme ? "ace/theme/" + aceTheme : "ace/theme/textmate");

        // set font size
        editor.setFontSize(16);

        // set other ace options
        editor.session.setMode("ace/mode/html");
        editor.setReadOnly(readOnly === undefined ? true : readOnly);
        editor.setValue("");

        // save editor for use in event listener
        this.editor = editor;
        return this.editor;
    }

    toggleEditMode() {
        this.editMode = this.editMode ? 0 : 1;

        if (this.editMode)
            this.aceCallbackFunction();
        else
            this.editorCallbackFunction();
    }

    /**
     * Add an event listener to Blockly or Ace to generate a preview and code
     *
     * @param {function} [customFunction] - a function to execute at the end of the change event. Gets passed the scope as a parameter.
     * @param [scope] - whether to apply the event to "blockly" or "ace" (default "blockly")
     * @param [event] - the name of the event (e.g "change") to trigger the callback on - required if `scope === "ace"`, is ignored otherwise
     */
    addEvent(customFunction, scope, event) {
        if (scope === "blockly" || !scope) {
            // add listener to workspace
            this.editorCallbackFunction = function () {
                if (!this.editMode) {
                    // generate the code using htmlGen from generator.js
                    let code = htmlGen.workspaceToCode(this.ffauWorkspace);

                    // if ace has been initialised (doesn't have to be)
                    if (this.editor)
                    // set the ace editor value
                        this.editor.setValue(code, -1 /* set the cursor to -1 to stop highlighting everything */);

                    // if iframe has been initialised
                    if (this.iframe)
                        this.iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);

                    if (typeof customFunction === "function")
                        customFunction(this);
                }
            };

            this.ffauWorkspace.addChangeListener(this.editorCallbackFunction.bind(this) /* bind parent scope */);
        } else if (scope === "ace") {
            this.aceCallbackFunction = customFunction;

            if (event)
                this.editor.container.addEventListener(event, customFunction);
            else
                this.editor.getSession().on('change', customFunction);
        } else
            console.warn("Scope `" + scope + "` is not one of ['blockly', 'ace']")
    }

    /**
     * Return HTML code in string format
     *
     * @returns {string}
     */
    generateCode() {
        // run generator
        return htmlGen.workspaceToCode(this.ffauWorkspace);
    }

    /**
     * Converts the code string into a Blockly XML string
     *
     * @param {string} code - the HTML source code string
     * @returns {string} - the Blockly XML
     */
    codeToXML(code) {
        let idList = [];
        let replacerIds = [];

        let cssCommentRegExp = /(?<=^[^"]*?("[^"]*?")*[^"]*?)((?<!\\)\/\*[^*]*?[^\\]\*\/)/g;

        function getReplacerId() {
            let replacerId = (Math.floor(Math.random() * 90000) + 10000).toString();
            while (code.includes(replacerId) || replacerIds.includes(replacerId))
                replacerId = (Math.floor(Math.random() * 90000) + 10000).toString();

            replacerIds.push(replacerId);
            return replacerId;
        }

        function getBlockId() {
            function idGen() {
                return Array(20).fill(0).map(() => [..."`0123456789{}!$./,()*[]`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"][Math.floor(Math.random() * 81)]).join('')
            }

            let id = idGen();
            while (idList.includes(id))
                id = idGen();

            idList.push(id);
            return id;
        }

        function evalBooleanAttr(attrVal) {
            return attrVal === null ? "false" :
                (attrVal.toLowerCase() === "false" ? "false" : "true");
        }

        function extractStyleSheet(styleSheetString, hasSelectors) {
            function extractStyles(styleString) {
                let uniqueId = getReplacerId();

                let stringSplit = (" " + styleString)
                    .split(/(?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]'))/g)
                    .filter((_, z) => z % 8 === 0 || z % 8 === 1);
                stringSplit[0] = stringSplit[0].substr(1);

                stringSplit = stringSplit
                    .map((e, _) => _ % 2 ? e : e.replace(/:/g, uniqueId).split(/[;\n]/g))
                    .flat();

                let stylePairs = [];
                let thisStylePair = "";
                stringSplit.forEach(string => {
                    if (string.includes(uniqueId)) {
                        stylePairs.push(thisStylePair.split(uniqueId).map(e => e.trim()));
                        thisStylePair = string;
                    } else
                        thisStylePair += string;
                });
                stylePairs.push(thisStylePair.split(uniqueId).map(e => e.trim()));

                return stylePairs.filter(e => e.length - 1);
            }

            if (!hasSelectors)
                return extractStyles(styleSheetString);
            else {
                let uniqueId = getReplacerId();

                let selectors = (" " + styleSheetString)
                    .split(/(?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]'))/g)
                    .filter((_, z) => z % 8 === 0 || z % 8 === 1);
                selectors[0] = selectors[0].substr(1);

                selectors = selectors
                    .map((e, _) => _ % 2 ? e : e.replace(/[}{]/g, uniqueId))
                    .flat()
                    .join('')
                    .split(uniqueId)
                    .reduce((r, e, i) =>
                        (i % 2 ? r[r.length - 1].push(e) : r.push([e])) && r
                        , [])
                    .filter(e => e.filter(e => e.length).length)
                    .map(e => [e[0].trim(), extractStyles(e[1])]);

                return selectors;
            }
        }

        function constructStyleTree(selectors, initialParent) {
            let parent = initialParent;
            let forceParent = false;
            selectors.forEach((selector, m) => {
                function mapColorLikeBlock(colorStr, valueName) {
                    let colorValue = document.createElement("value");
                    colorValue.setAttribute("name", valueName);

                    let colorBlock = document.createElement("block");
                    colorBlock.setAttribute("id", getBlockId());

                    if (/#(?:[0-9a-fA-F]{3}){1,2}/g.test(colorStr.trim())) {
                        valueField.parentNode.removeChild(valueField);
                        valueField.setAttribute("name", "color");
                        valueField.innerText = colorStr.trim().replace(/^#/g, "");

                        colorBlock.setAttribute("type", "hex_picker");

                        colorBlock.appendChild(valueField);
                        colorValue.appendChild(colorBlock);
                    } else if (/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/g.test(colorStr.trim())) {
                        valueField.parentNode.removeChild(valueField);
                        valueField.setAttribute("name", "a");
                        valueField.innerText = colorStr.trim().replace(/^#/g, "");

                        colorBlock.setAttribute("type", "rgba_picker");

                        let r = document.createElement("field");
                        r.setAttribute("name", "r");

                        let g = document.createElement("field");
                        g.setAttribute("name", "g");

                        let b = document.createElement("field");
                        b.setAttribute("name", "b");

                        r.innerText = colorStr.split(",")[0].trim().replace(/^rgba?\(/g, "").trim();
                        g.innerText = colorStr.split(",")[1].trim();
                        b.innerText = colorStr.split(",")[2].trim();

                        colorBlock.appendChild(r);
                        colorBlock.appendChild(g);
                        colorBlock.appendChild(b);

                        if (colorStr.split(",").length === 4) {
                            valueField.innerText = colorStr.split(",")[3].trim().replace(/\)$/g, "");
                            colorBlock.appendChild(valueField);
                        }

                        colorValue.appendChild(colorBlock);
                    } else {
                        if (Blockly.FieldColour.TITLES.includes(colorStr.trim())) {
                            valueField.parentNode.removeChild(valueField);
                            colorBlock.setAttribute("type", "color_picker");

                            valueField.setAttribute("name", "color");
                            valueField.innerHTML = Blockly.FieldColour.COLOURS[
                                Blockly.FieldColour.TITLES.indexOf(colorStr.trim())
                                ];

                            colorBlock.appendChild(valueField);
                            colorValue.appendChild(colorBlock);
                        } else if (colorNames.indexOf(colorStr.toLowerCase()) > -1)
                            mapColorLikeBlock("#" + colorValues[colorNames.indexOf(colorStr.toLowerCase())]);
                    }

                    styleBlock.appendChild(colorValue);
                }

                function directionVariant(blockType, tagBase) {
                    if (filteredSelector[0] === tagBase + "-left" ||
                        filteredSelector[0] === tagBase + "-top" ||
                        filteredSelector[0] === tagBase + "-right" ||
                        filteredSelector[0] === tagBase + "-bottom") {
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", blockType);

                        let marginDirectionField = document.createElement("field");
                        marginDirectionField.setAttribute("name", "direction");
                        marginDirectionField.innerText = filteredSelector[0].split("-")[1];

                        styleBlock.appendChild(marginDirectionField);
                    } else {
                        let tags = filteredSelector[1].split(/ +/g);

                        if (tags.length === 3) tags.push(tags[1]);
                        if (tags.length === 2) tags = tags.map(e => [e, e]).flat();
                        if (tags.length === 1) tags = tags.map(e => [e, e, e, e]).flat();

                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", blockType);

                        valueField.innerText = tags[0];

                        let leftTagField = document.createElement("field");
                        leftTagField.setAttribute("name", "direction");
                        leftTagField.innerText = "top";

                        styleBlock.appendChild(leftTagField);

                        let tagParent = styleBlock;
                        tags.slice(1).forEach((tag, f) => {
                            let tagNext1 = document.createElement("next");

                            let tagBlock2 = document.createElement("block");
                            tagBlock2.setAttribute("id", getBlockId());
                            tagBlock2.setAttribute("type", blockType);

                            let tagVal2 = document.createElement("field");
                            tagVal2.setAttribute("name", "value");
                            tagVal2.innerText = tag;

                            let nextTagField = document.createElement("field");
                            nextTagField.setAttribute("name", "direction");
                            nextTagField.innerText = ["right", "bottom", "left"][f];

                            tagBlock2.appendChild(tagVal2);
                            tagBlock2.appendChild(nextTagField);
                            tagNext1.appendChild(tagBlock2);
                            tagParent.appendChild(tagNext1);

                            tagParent = tagBlock2;
                        });

                        let newForceParent = document.createElement("next");
                        tagParent.appendChild(newForceParent);

                        parent = newForceParent;
                        forceParent = true;
                    }
                }

                let comments = (selector.join('').match(cssCommentRegExp) || [])
                    .map(e => e.trim().replace(/(?:^\/\*)|(?:\*\/$)/g, ""))
                    .filter(e => e)
                    .join('    ')
                    .trim();
                let filteredSelector = selector.map(e =>
                    e.replace(cssCommentRegExp, '')
                        .replace(/\\\/\*/g, "/*")
                        .trim()
                );

                let styleBlock = document.createElement("block");
                styleBlock.setAttribute("id", getBlockId());

                if (comments) {
                    let commentTag = document.createElement("comment");
                    commentTag.setAttribute("pinned", "false");
                    commentTag.innerText = comments;

                    styleBlock.appendChild(commentTag);
                }

                let valueField = document.createElement("field");
                valueField.innerText = filteredSelector[1].trim().replace(/^#/g, "");

                styleBlock.appendChild(valueField);
                parent.appendChild(styleBlock);

                switch (filteredSelector[0]) {
                    case 'font-size':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "fontsize");
                        break;
                    case 'font-family':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "fontfamily");
                        break;
                    case 'font-weight':
                        valueField.setAttribute("name", "weight");
                        styleBlock.setAttribute("type", "fontweight");
                        break;
                    case 'color':
                        if (["initial", "inherit"].includes(filteredSelector[1])) {
                            valueField.setAttribute("name", "color");
                            styleBlock.setAttribute("type", "colordropdown");
                        } else {
                            valueField.setAttribute("name", "content");
                            styleBlock.setAttribute("type", "color-new");
                            mapColorLikeBlock(filteredSelector[1], "value");
                        }
                        break;
                    case 'text-shadow':
                    case 'box-shadow':
                        if (filteredSelector[0] === "box-shadow") {
                            valueField.setAttribute("name", "color");
                            styleBlock.setAttribute("type", "boxshadow-new");
                        } else {
                            valueField.setAttribute("name", "color");
                            styleBlock.setAttribute("type", "textshadow-new");
                        }

                        let splitStr = filteredSelector[1].split(/ +/g).map(e => e.trim()).filter(e => e);

                        if (splitStr.length === 2) {
                            splitStr.push("0px");
                            splitStr.push("white");
                        } else {
                            if (splitStr[2] === "0" || cssUnits.some(e => splitStr[2].endsWith(e)))
                                splitStr.push("white");
                            else
                                splitStr.splice(2, 0, "0");
                        }

                        let xOffsetField = document.createElement("field");
                        xOffsetField.setAttribute("name", "xoffset");
                        xOffsetField.innerText = splitStr[0];

                        let yOffsetField = document.createElement("field");
                        yOffsetField.setAttribute("name", "yoffset");
                        yOffsetField.innerText = splitStr[1];

                        let blurField = document.createElement("field");
                        blurField.setAttribute("name", "blur");
                        blurField.innerText = splitStr[2];

                        styleBlock.appendChild(xOffsetField);
                        styleBlock.appendChild(yOffsetField);
                        styleBlock.appendChild(blurField);

                        mapColorLikeBlock(splitStr[3], "color");
                        break;
                    case 'text-transform':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "texttransform");
                        break;
                    case 'text-align':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "textalign");
                        break;
                    case 'letter-spacing':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "letterspacing");
                        break;
                    case 'margin-top':
                    case 'margin-bottom':
                    case 'margin-left':
                    case 'margin-right':
                    case 'margin':
                        directionVariant('margin', 'margin');
                        break;
                    case 'padding-top':
                    case 'padding-bottom':
                    case 'padding-left':
                    case 'padding-right':
                    case 'padding':
                        directionVariant('padding', 'padding');
                        break;
                    case 'display':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "display");
                        break;
                    case 'overflow':
                    case 'overflow-x':
                    case 'overflow-y':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "overflow");

                        let directionField = document.createElement("field");
                        directionField.setAttribute("name", "direction");
                        directionField.innerText = (filteredSelector[0] + "-x").split("-")[1];

                        styleBlock.appendChild(directionField);

                        if (filteredSelector[0] === "overflow") {
                            let overflowYBlock = document.createElement("block");
                            overflowYBlock.setAttribute("id", getBlockId());
                            overflowYBlock.setAttribute("type", "overflow");

                            let overflowYField = document.createElement("field");
                            overflowYField.innerText = filteredSelector[1].trim().replace(/^#/g, "");
                            overflowYField.setAttribute("name", "content");

                            let directionYField = document.createElement("field");
                            directionYField.setAttribute("name", "direction");
                            directionYField.innerText = "y";

                            overflowYBlock.appendChild(overflowYField);
                            overflowYBlock.appendChild(directionYField);

                            let next = document.createElement("next");
                            next.appendChild(overflowYBlock);
                            styleBlock.appendChild(next);
                        }
                        break;
                    case 'float':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "float");
                        break;
                    case 'vertical-align':
                        valueField.setAttribute("name", "align");
                        styleBlock.setAttribute("type", "verticalalign");
                        break;
                    case 'width':
                        valueField.setAttribute("name", "size");
                        styleBlock.setAttribute("type", "width");
                        break;
                    case 'height':
                        valueField.setAttribute("name", "size");
                        styleBlock.setAttribute("type", "height");
                        break;
                    case 'background-color':
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "bgcolor-new");
                        mapColorLikeBlock(filteredSelector[1], "value");
                        break;
                    case 'background-image':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "bgimage");

                        valueField.innerText =
                            (
                                (filteredSelector[1].split(/(url\(['"])/g)[2]
                                    || "")
                                    .split(/(['"]\))/g).reverse()[2]
                                || "url"
                            ).replace(/^['"]|['"]$/g, "");
                        break;
                    case 'background-position':
                    case 'background-repeat':
                    case 'background-size':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", `bg${filteredSelector[0].split("-")[1]}`);
                        break;
                    case 'cursor':
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "cursor");
                        break;
                    case 'border-left':
                    case 'border-bottom':
                    case 'border-top':
                    case 'border-right':
                    case 'border':
                        valueField.setAttribute("name", "color");
                        styleBlock.setAttribute("type", "border-new");

                        valueField.innerText = filteredSelector[1].trim().split(/ +/g)[2] || "";

                        let widthField = document.createElement("field");
                        widthField.setAttribute("name", "width");
                        widthField.innerText = filteredSelector[1].trim().split(/ +/g)[0] || "10px";

                        let styleField = document.createElement("field");
                        styleField.setAttribute("name", "type");
                        styleField.innerText = filteredSelector[1].trim().split(/ +/g)[1] || "none";

                        styleBlock.appendChild(widthField);
                        styleBlock.appendChild(styleField);

                        if (filteredSelector[0] !== "border") {
                            styleBlock.setAttribute("type", "borderedge-new");

                            let sideField = document.createElement("field");
                            sideField.setAttribute("name", "edge");
                            sideField.innerText = filteredSelector[0].split("-")[1];

                            styleBlock.appendChild(sideField);
                        }

                        mapColorLikeBlock(valueField.innerHTML, "color");
                        break;
                    case "border-collapse":
                        valueField.setAttribute("name", "value");
                        styleBlock.setAttribute("type", "bordercol");

                        if (filteredSelector[1] === "collapse")
                            valueField.innerText = "TRUE";
                        else if (filteredSelector[1] === "separate")
                            valueField.innerText = "FALSE";
                        break;
                    case "border-radius":
                        valueField.setAttribute("name", "content");
                        styleBlock.setAttribute("type", "borderrad");
                        break;
                    case "transition":
                        valueField.parentNode.removeChild(valueField);
                        styleBlock.setAttribute("type", "transition");

                        let allSections = filteredSelector[1].split(/(?<!\(),(?![^(]*[)])/g).map(e => e.trim());

                        let transitionParent = styleBlock;
                        allSections.forEach((transitionElem, c) => {
                            let property = transitionElem.split(/ +/g)[0];
                            let duration = transitionElem.split(/ +/g)[1].replace(/([s ])*/g, "");
                            let delay = transitionElem.split(/ +/g)[2].replace(/([s ])*/g, "") || "0";
                            let timing = transitionElem.split(/ +/g).slice(3).join("") || "linear";

                            let transitionPropertyField = document.createElement("field");
                            let transitionDurationField = document.createElement("field");
                            let transitionDelayField = document.createElement("field");
                            let transitionTimingField = document.createElement("value");

                            transitionPropertyField.setAttribute("name", "transition-property");
                            transitionDurationField.setAttribute("name", "duration");
                            transitionDelayField.setAttribute("name", "delay");
                            transitionTimingField.setAttribute("name", "timing-function");

                            transitionPropertyField.innerText = property.trim();
                            transitionDurationField.innerText = duration.trim();
                            transitionDelayField.innerText = delay.trim();

                            let timingBlock = document.createElement("block");
                            timingBlock.setAttribute("id", getBlockId());
                            if (timing.startsWith("cubic-bezier(")) {
                                timingBlock.setAttribute("type", "transitiontimingbezier");

                                let bez1 = document.createElement("field");
                                let bez2 = document.createElement("field");
                                let bez3 = document.createElement("field");
                                let bez4 = document.createElement("field");

                                bez1.setAttribute("name", "bez1");
                                bez2.setAttribute("name", "bez2");
                                bez3.setAttribute("name", "bez3");
                                bez4.setAttribute("name", "bez4");

                                let bezPointList = timing.trim().split("cubic-bezier(").slice(1).join("")
                                    .replace(/\)/g, "")
                                    .split(",");
                                bez1.innerText = bezPointList[0].trim();
                                bez2.innerText = bezPointList[1].trim();
                                bez3.innerText = bezPointList[2].trim();
                                bez4.innerText = bezPointList[3].trim();

                                timingBlock.appendChild(bez1);
                                timingBlock.appendChild(bez2);
                                timingBlock.appendChild(bez3);
                                timingBlock.appendChild(bez4);
                            } else {
                                timingBlock.setAttribute("type", "transitiontimingdropdown");

                                let functionNameField = document.createElement("field");
                                functionNameField.setAttribute("name", "function");
                                functionNameField.innerText = timing.trim();

                                timingBlock.appendChild(functionNameField);
                            }

                            transitionTimingField.appendChild(timingBlock);

                            transitionParent.appendChild(transitionPropertyField);
                            transitionParent.appendChild(transitionDurationField);
                            transitionParent.appendChild(transitionDelayField);
                            transitionParent.appendChild(transitionTimingField);

                            let newTransitionParent = document.createElement("next");
                            transitionParent.appendChild(newTransitionParent);

                            if (c < allSections.length - 1) {
                                let newTransitionBlock = document.createElement("block");
                                newTransitionBlock.setAttribute("id", getBlockId());
                                newTransitionBlock.setAttribute("type", "transition");
                                newTransitionParent.appendChild(newTransitionBlock);

                                transitionParent = newTransitionBlock;
                            } else {
                                transitionParent = newTransitionParent;
                            }
                        });

                        parent = transitionParent;
                        forceParent = true;

                        break;
                    default:
                        styleBlock.setAttribute("type", "othercss");
                        valueField.setAttribute("name", "value");

                        let propertyField = document.createElement("field");
                        propertyField.setAttribute("name", "property");
                        propertyField.innerText = filteredSelector[0];

                        styleBlock.appendChild(propertyField);
                        break;
                }

                if (m < selectors.length - 1) {
                    if (!forceParent) {
                        let t = document.createElement("next");
                        styleBlock.appendChild(t);

                        parent = t;
                    } else {
                        forceParent = false;
                    }
                }
            });
        }

        String.prototype.closeTag = function (tagName, closeId) {
            let openTagRE = new RegExp(`((?<!${nonStringId}(?:'(?:\\.|[^'])*')|(?:"(?:\\.|[^"])*"))< *${tagName}(?:(?:${nonStringId}.*?${nonStringId})|[^>])*?[^/] *>(?!< *\/ *${tagName}))`, "g");

            return this.split(/((?:"(\\.|[^"])*")|(?:'(\\.|[^'])*'))/g)
                .filter((_, i) => i % 4 < 2).map((_, i) => i % 2 ? _ : nonStringId + _ + nonStringId)
                .join("")
                .split(openTagRE)
                .map(e => e.replace(new RegExp(nonStringId, "g"), ""))
                .filter(e => e)
                .map(e => openTagRE.test(e) ? `${e.trim().slice(0, -1)}/>`.replace(/\/\/ *>$/g, "\/>").replace(new RegExp(tagName, "g"), tagName + closeId) : e)
                .join("")
        };

        let parallelTree = document.createElement("xml");
        parallelTree.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

        let tempId = getReplacerId();
        let tagId = getReplacerId();
        let nonStringId = getReplacerId();

        let closeId = getReplacerId();
        let slashedId = getReplacerId();

        let overrideTags = ["br", "hr", "tr", "td", "th", "table", "header", "html", "head", "body", "base", "link", "meta",
            "script", "title", "noscript"];
        let overrideExp = "(" + overrideTags.join(")|(") + ")";

        let bodifiedCode = (" " + code)
            .split(/((?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]')))|((?<=([^\\]>)|^)((\\<)|([^<]))*[^\\](?=<))/g)
            .filter((_, z) => z % 14 === 0 || (_ && (z % 14 === 1 || z % 14 === 9)))
            .map((v, i) =>
                i % 2 === 0 ?
                    (!i ? v.substr(1) : v)
                        .replace(new RegExp(`< *\\/? *(${overrideExp})(?=.*(>|(= *)))`, "gi"),
                            z => `${z.toLowerCase()}Tag${tempId}`)
                        .replace(/<!DOCTYPE html>/gi, "<doctypeTag></doctypeTag>")
                    : v)
            .filter((_, z) => z ? z === 1 ? _ !== " " : true : _)
            .join("")
            .closeTag(`metaTag${tempId}`, closeId)
            .closeTag(`img`, closeId)
            .closeTag(`hr${tempId}`, closeId)
            .closeTag(`br${tempId}`, closeId)
            .split(/(?<=<\/?[a-zA-Z0-9]+(?: *[a-zA-Z]+(?:=(?:(?:"(?:\\.|[^"])*")|(?:'(?:\\.|[^'])*')|(?:[0-9]|(?:true|false))))?)* *\/?>(?:\\.|[^<])*)/g)
            .reduce((v, e) =>
                ((e.length - 1) ?
                    v.push(e) : (typeof v[v.length - 1] === "string" ? v.push([e]) : v[v.length - 1][0] += e))
                && v
                , [])
            .flat()
            .reduce((v, e) =>
                (e[0] === "<" ? v.push(e) : v[v.length - 1] += e)
                && v
                , [""])
            .map(t =>
                t.replace(/^<([a-zA-Z0-9]+.*)\/ *>/g, `${tagId}$&${tagId}`)
                    .split(tagId)
                    .filter(e => e)
                    .map(m =>
                        /^<([a-zA-Z0-9]+.*)\/ *>/g.test(m) ?
                            [m.trim().split(/(\/ *>)(?!.*\/ *>)/g)[0].substr(1).trim()]
                                .map(u => `<${
                                    (
                                        u.split(" ")[0] + slashedId
                                        + (u.split(" ").length - 1 ? " " : "")
                                        + u.split(" ").slice(1).join(" ")
                                    )
                                        .replace(new RegExp(closeId + slashedId, "g"), closeId)
                                }></${
                                    (u.split(" ")[0] + slashedId)
                                        .replace(new RegExp(closeId + slashedId, "g"), closeId)
                                }>`)
                            : m)
                    .join(''))
            .join('');

        let domParser = new DOMParser();
        let parsedHTML = domParser.parseFromString("<body>" + bodifiedCode + "</body>", "text/html").body;

        Array.from(parsedHTML.getElementsByTagName("style")).forEach(e => {
            e.innerText = e.innerText.replace(new RegExp(tempId, "g"), "");

            e.innerText = e.innerText.replace(new RegExp(
                `< *([^ ]*?)${closeId}(.*?)>< *\\/(?:\\1)${closeId} *>`, "g"),
                "<$1$2>"
            );

            e.innerText = e.innerText.replace(new RegExp(
                `< *([^ ]*?)${slashedId}(.*?)>< *\\/(?:\\1)${slashedId} *>`, "g"),
                "<$1$2/>"
            );
        });

        parsedHTML.innerHTML = parsedHTML.innerHTML
            .replace(new RegExp(slashedId, "g"), "")
            .replace(new RegExp(closeId, "g"), "");

        const reconstruct = (parent, parallelParent, isTopLevel) => {
            let parallelChildren = [];

            let comment = false;

            for (let i = 0, child = parent.childNodes[0]; i < parent.childNodes.length; i++, child = parent.childNodes[i]) {
                child.innerHTML ? child.innerHTML = child.innerHTML.trim() : child.textContent = child.textContent.trim();

                let newNode;
                let childrenContainer;
                let childrenPreHandled = false;

                function template_EmptyStatement(blockType, statementName) {
                    newNode = document.createElement("block");
                    newNode.setAttribute("type", blockType);
                    newNode.setAttribute("id", getBlockId());

                    childrenContainer = document.createElement("statement");
                    childrenContainer.setAttribute("name", statementName ? statementName : "content");

                    newNode.appendChild(childrenContainer);
                }

                switch (child.nodeName) {
                    case `HEADTAG${tempId}`:
                    case `HTMLTAG${tempId}`:
                    case `BODYTAG${tempId}`:
                        template_EmptyStatement(child.nodeName.slice(0, -8).toLowerCase());
                        break;

                    case `STYLE`:
                        template_EmptyStatement("style");
                        break;

                    case `METATAG${tempId}`:
                        newNode = document.createElement("block");
                        newNode.setAttribute("id", getBlockId());

                        if (child.getAttribute("name") === "viewport") {
                            newNode.setAttribute("type", "metaviewport");
                            child.removeAttribute("name");
                        } else if (child.hasAttribute("charset")) {
                            newNode.setAttribute("type", "metacharset");

                            let charsetField = document.createElement("field");
                            charsetField.setAttribute("name", "value");
                            charsetField.innerText = child.getAttribute("charset");

                            newNode.appendChild(charsetField);

                            child.removeAttribute("charset");
                        }
                        break;

                    case `H1`:
                    case `H2`:
                    case `H3`:
                    case `H4`:
                    case `H5`:
                    case `H6`:
                        template_EmptyStatement("header");

                        let size = document.createElement("field");
                        size.setAttribute("name", "size");
                        size.innerText = child.nodeName.substr(1);

                        newNode.appendChild(size);
                        break;

                    case `TITLETAG${tempId}`:
                        newNode = document.createElement("block");
                        newNode.setAttribute("type", "title");
                        newNode.setAttribute("id", getBlockId());

                        let title = document.createElement("field");
                        title.setAttribute("name", "value");
                        title.innerText = child.innerText;

                        childrenPreHandled = true;

                        newNode.appendChild(title);
                        break;

                    case `HEADERTAG${tempId}`:
                        template_EmptyStatement("headertag");
                        break;

                    case `FOOTER`:
                        template_EmptyStatement("footertag");
                        break;

                    case 'DIV':
                        template_EmptyStatement("divider");
                        break;

                    case `HRTAG${tempId}`:
                    case `BRTAG${tempId}`:
                        newNode = document.createElement("block");
                        newNode.setAttribute("type", child.nodeName.startsWith('BR') ? 'linebreak' : 'hline');
                        newNode.setAttribute("id", getBlockId());
                        break;

                    case 'P':
                        template_EmptyStatement("paragraph");
                        break;

                    case 'SPAN':
                        template_EmptyStatement("span");
                        break;

                    case 'A':
                        template_EmptyStatement("link");

                        let href;
                        if (child.hasAttribute("href")) {
                            href = child.getAttribute("href");
                            child.removeAttribute("href");
                        } else
                            href = "#!";

                        let targetField = document.createElement("field");
                        targetField.setAttribute("name", "target");
                        targetField.innerText = href;

                        newNode.appendChild(targetField);
                        break;

                    case 'STRONG':
                    case 'EM':
                    case 'MARK':
                    case 'SMALL':
                    case 'BIG':
                    case 'DEL':
                    case 'INS':
                    case 'SUB':
                    case 'SUP':
                    case 'CODE':
                    case 'Q':
                    case 'ASIDE':
                    case 'BLOCKQUOTE':
                    case 'LEGEND':
                    case 'CITE':
                        template_EmptyStatement("textmod");

                        let modField = document.createElement("field");
                        modField.setAttribute("name", "type");
                        modField.innerText = child.nodeName.toLowerCase();

                        newNode.appendChild(modField);
                        break;

                    case `TABLETAG${tempId}`:
                        template_EmptyStatement("table");
                        break;

                    case `TRTAG${tempId}`:
                        template_EmptyStatement("tablerow");
                        break;

                    case `THTAG${tempId}`:
                        template_EmptyStatement("tableheading");
                        break;

                    case `TDTAG${tempId}`:
                        template_EmptyStatement("tabledata");
                        break;

                    case `OL`:
                        template_EmptyStatement("orderedlist");
                        break;

                    case `UL`:
                        template_EmptyStatement("unorderedlist");
                        break;

                    case `LI`:
                        template_EmptyStatement("listitem");
                        break;

                    case `DETAILS`:
                    case `SUMMARY`:
                        template_EmptyStatement(child.nodeName.toLowerCase());
                        break;

                    case `FORM`:
                        template_EmptyStatement("form");
                        break;

                    case `INPUT`:
                        newNode = document.createElement("block");
                        newNode.setAttribute("type", "input");
                        newNode.setAttribute("id", getBlockId());

                        let inputType = document.createElement("field");
                        inputType.setAttribute("name", "type");
                        inputType.innerText = child.getAttribute("type") || "submit";

                        let valueField = document.createElement("field");
                        valueField.setAttribute("name", "value");
                        valueField.innerText = child.getAttribute("value") || "";

                        let placeholderField = document.createElement("field");
                        placeholderField.setAttribute("name", "placeholder");
                        placeholderField.innerText = child.getAttribute("placeholder") || "";

                        let nameField = document.createElement("field");
                        nameField.setAttribute("name", "name");
                        nameField.innerText = child.getAttribute("name") || "";

                        newNode.appendChild(inputType);
                        newNode.appendChild(valueField);
                        newNode.appendChild(placeholderField);
                        newNode.appendChild(nameField);

                        child.removeAttribute("type");
                        child.removeAttribute("value");
                        child.removeAttribute("placeholder");
                        child.removeAttribute("name");
                        break;

                    case `LABEL`:
                        template_EmptyStatement("label");

                        let forField = document.createElement("field");
                        forField.setAttribute("name", "for");
                        forField.innerText = child.getAttribute("for") || "for";

                        newNode.appendChild(forField);

                        child.removeAttribute("for");
                        break;

                    case `IMG`:
                        template_EmptyStatement("image");

                        let imgSrcField = document.createElement("field");
                        imgSrcField.setAttribute("name", "source");
                        imgSrcField.innerText = child.getAttribute("src") || "http://";

                        newNode.appendChild(imgSrcField);

                        child.removeAttribute("src");
                        break;

                    case `AUDIO`:
                    case `VIDEO`:
                        template_EmptyStatement(child.nodeName.toLowerCase());

                        let audioSrcField = document.createElement("field");
                        audioSrcField.setAttribute("name", "source");

                        if (child.nodeName === "AUDIO")
                            audioSrcField.innerText = ["8bit.ogg", "classical.mp3", "happy.wav"]
                                .includes(child.getAttribute("src")) ? child.getAttribute("src") : "8bit.ogg";
                        else {
                            let index = ["bigbuckbunny.mp4", "llamadrama.mp4"].indexOf(child.getAttribute("src"));

                            audioSrcField.innerText = index > -1 ?
                                ["bbb", "ld"][index] : "bbb";
                        }

                        let loopField = document.createElement("field");
                        loopField.setAttribute("name", "loop");
                        loopField.innerText = evalBooleanAttr(child.getAttribute("loop"));

                        let autoplayField = document.createElement("field");
                        autoplayField.setAttribute("name", "autoplay");
                        autoplayField.innerText = evalBooleanAttr(child.getAttribute("autoplay"));

                        let controlsField = document.createElement("field");
                        controlsField.setAttribute("name", "controls");
                        controlsField.innerText = evalBooleanAttr(child.getAttribute("controls"));

                        newNode.appendChild(audioSrcField);
                        newNode.appendChild(loopField);
                        newNode.appendChild(autoplayField);
                        newNode.appendChild(controlsField);

                        child.removeAttribute("src");
                        child.removeAttribute("loop");
                        child.removeAttribute("autoplay");
                        child.removeAttribute("controls");
                        break;

                    case "#text":
                        if (child.parentNode.nodeName !== `STYLE` && child.textContent.trim()) {
                            if (child.textContent.includes("\n"))
                                child.splitText(child.textContent.indexOf("\n") + 1);

                            newNode = document.createElement("block");
                            newNode.setAttribute("type", "emptytext");
                            newNode.setAttribute("id", getBlockId());

                            let textContent = document.createElement("field");
                            textContent.setAttribute("name", "content");
                            textContent.innerText = child.textContent.replace(/\n*$/g, "");

                            newNode.appendChild(textContent);
                        } else if (child.parentNode.nodeName === `STYLE`) {
                            let selectors = extractStyleSheet(child.textContent, true)
                                .filter(e => e[0]);

                            selectors.forEach(selector => {
                                let selectorBlock = document.createElement("block");
                                selectorBlock.setAttribute("type", "cssitem");
                                selectorBlock.setAttribute("id", getBlockId());

                                let openBracketId = getReplacerId();
                                let closeBracketId = getReplacerId();

                                let comments = (selector[0].match(cssCommentRegExp) || [])
                                    .map(e => e.trim().replace(/(?:^\/\*)|(?:\*\/$)/g, ""))
                                    .filter(e => e)
                                    .join('    ')
                                    .trim();
                                selector[0] = selector[0].replace(cssCommentRegExp, '')
                                    .replace(/\\\/\*/g, "/*")
                                    .trim();

                                if (comments) {
                                    let commentTag = document.createElement("comment");
                                    commentTag.setAttribute("pinned", "false");
                                    commentTag.innerText = comments;

                                    selectorBlock.appendChild(commentTag);
                                }

                                let selectorSections = selector[0]
                                    .toLowerCase()
                                    .split(/((?:(?<=')(?:\\.|[^'])*(?='))|(?:(?<=")(?:\\.|[^"])*(?="))|(?:(?<=\()[^'"]*(?=\))))/g)
                                    .map((e, i) => i % 2 ?
                                        encodeURIComponent(
                                            e.replace(/\(/g, openBracketId)
                                                .replace(/\)/g, closeBracketId)
                                        ) : e
                                    )
                                    .join("")
                                    .split(/(?<!:):(?=hover|focus|:before|:after|not\()(?![^(]*\))/g)
                                    .map(e =>
                                        decodeURIComponent(e)
                                            .replace(new RegExp(openBracketId, "g"), '(')
                                            .replace(new RegExp(closeBracketId, "g"), ')')
                                    );

                                let selectorField = document.createElement("field");
                                selectorField.setAttribute("name", "selector");
                                selectorField.innerText = selectorSections[0];

                                if (selectorSections.length - 1) {
                                    let modifierValue = document.createElement("value");
                                    modifierValue.setAttribute("name", "modifier");

                                    let selectorParent = modifierValue;
                                    selectorSections.slice(1).forEach((section, j) => {
                                        let newMod = document.createElement("block");
                                        newMod.setAttribute("id", getBlockId());

                                        let contentField = document.createElement("field");
                                        contentField.setAttribute("name", "content");
                                        newMod.appendChild(contentField);

                                        if (section.slice(0, 4) === "not(") {
                                            newMod.setAttribute("type", "cssnot");
                                            contentField.innerText = section.slice(4, -1);
                                        } else {
                                            newMod.setAttribute("type", "cssevents");
                                            contentField.innerText = section;
                                        }

                                        selectorParent.appendChild(newMod);

                                        if (j < selectorSections.length - 2) {
                                            let nextMod = document.createElement("value");
                                            nextMod.setAttribute("name", "modifier");
                                            newMod.appendChild(nextMod);

                                            selectorParent = nextMod;
                                        }
                                    });

                                    selectorBlock.appendChild(modifierValue);
                                }

                                let selectorContent = document.createElement("statement");
                                selectorContent.setAttribute("name", "content");

                                constructStyleTree(selector[1], selectorContent);

                                selectorBlock.appendChild(selectorField);
                                selectorBlock.appendChild(selectorContent);
                                parallelChildren.push(selectorBlock);
                            });
                        }
                        break;

                    case "#comment":
                        comment = child.textContent;
                        continue;

                    default:
                        continue;
                }

                if (comment && newNode) {
                    let commentTag = document.createElement("comment");
                    commentTag.setAttribute("pinned", "false");

                    commentTag.innerText = comment.toString();
                    newNode.appendChild(commentTag);

                    comment = false;
                }

                if (childrenPreHandled)
                    while (child.firstChild)
                        child.removeChild(child.firstChild);

                let attributes = Array.from(child.attributes || [])
                    .map(e => [e.name, e.value.trim()])
                    .filter(e => !e.some(
                        v => (/[<>]/g).test(v) ||
                            (new RegExp(`(${overrideExp})tag${tempId}`, "g"))
                                .test(v)
                    ));
                if (attributes.length) {
                    let attrInput = document.createElement("value");
                    attrInput.setAttribute("name", "modifier");

                    let attrContainer = document.createElement("block");
                    attrContainer.setAttribute("type", "args");
                    attrContainer.setAttribute("id", getBlockId());

                    let attrStatement = document.createElement("statement");
                    attrStatement.setAttribute("name", "content");

                    let attrParent = attrStatement;
                    attributes.forEach((attr, z) => {
                        let attrName = document.createElement("block");
                        attrName.setAttribute("id", getBlockId());

                        if (attr[0] === "class" || attr[0] === "id" || attr[0] === "align") {
                            attrName.setAttribute("type", attr[0]);

                            let attrValue = document.createElement("field");
                            attrValue.setAttribute("name", "content");
                            attrValue.innerText = attr[1].trim() || "true";

                            attrName.appendChild(attrValue);
                        } else if (attr[0] === "style") {
                            attrName.setAttribute("type", "stylearg");
                            let statement = document.createElement("statement");
                            statement.setAttribute("name", "content");

                            let selectors = extractStyleSheet(attr[1], false);
                            constructStyleTree(selectors, statement);

                            attrName.appendChild(statement);
                        } else {
                            attrName.setAttribute("type", "emptyarg");

                            let attrProperty = document.createElement("field");
                            attrProperty.setAttribute("name", "property");
                            attrProperty.innerText = attr[0];

                            let attrValue = document.createElement("field");
                            attrValue.setAttribute("name", "value");
                            attrValue.innerText = attr[1].trim() || "true";

                            attrName.appendChild(attrProperty);
                            attrName.appendChild(attrValue);
                        }

                        attrParent.appendChild(attrName);

                        if (z < attributes.length - 1) {
                            let v = document.createElement("next");
                            attrName.appendChild(v);

                            attrParent = v;
                        }
                    });

                    attrContainer.appendChild(attrStatement);
                    attrInput.appendChild(attrContainer);
                    newNode.appendChild(attrInput);
                }

                if (child.childNodes.length && childrenContainer)
                    reconstruct(child, childrenContainer);

                if (newNode)
                    parallelChildren.push(newNode);
                parallelChildren.push(newNode);
            }

            let newParent = parallelParent;
            parallelChildren.forEach((child, i) => {
                if (child)
                    newParent.appendChild(child);
                else
                    return false;

                if (i < parallelChildren.length - 1 && !isTopLevel) {
                    let v = document.createElement("next");
                    child.appendChild(v);
                    newParent = v;
                }
            });
        };

        reconstruct(parsedHTML, parallelTree, true);

        parallelTree.querySelectorAll("*").forEach(e => {
            if (e.nodeName === "STATEMENT" && !e.childElementCount) e.parentNode.removeChild(e);
        });

        return parallelTree.outerHTML;
    }


    /**
     * Return the XML block code in string format
     *
     * @returns {string}
     */
    generateXML() {
        // workspace -> XML
        const dom = Blockly.Xml.workspaceToDom(this.ffauWorkspace);
        // XML -> string
        return Blockly.Xml.domToText(dom);
    }

    /**
     * Downloads a txt file containing the XML data of the project, which can be used to save it locally.
     *
     * @param {string} [fileName=ffau-export.txt] - The name of the txt file
     * @returns {string} - The XML data as a string
     */
    downloadXML(fileName) {
        /* get the xml data from blockly */
        const data = this.generateXML();

        /* js hack to create element with unsupported mime type and force a download */
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
        // set the filename to fileName or the default
        element.setAttribute('download', fileName || 'ffau-export.txt');

        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        return data;
    }

    /**
     * Set the Blockly workspace to a specified XML string
     *
     * @param {string} xmlString - The XML string to use
     */
    setXML(xmlString) {
        // change the text to dom
        const dom = Blockly.Xml.textToDom(xmlString);
        // clear the workspace to avoid adding code on top
        this.clearWorkspace();

        // set the dom into the workspace
        Blockly.Xml.domToWorkspace(dom, this.ffauWorkspace);
    }

    /**
     * Clears all blocks from the workspace without further confirmation
     */
    clearWorkspace() {
        this.ffauWorkspace.clear();
    }
}
