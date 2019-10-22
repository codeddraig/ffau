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

    /**
     * Add an event listener to Blockly or Ace to generate a preview and code
     *
     * @param {function} [customFunction] - a function to execute at the end of the change event. Gets passed the scope as a parameter.
     * @param [scope] - whether to apply the event to "blockly" or "ace" (default "blockly")
     * @param [event] - the name of the event (e.g "change") to trigger the callback on - required if `scope === "ace"`, is ignored otherwise
     */
    addEvent(customFunction, scope, event) {
        if (scope === "blockly" || !scope)
        // add listener to workspace
            this.ffauWorkspace.addChangeListener(function () {
                // generate the code using htmlGen from generator.js
                let code = htmlGen.workspaceToCode(this.ffauWorkspace);

                // if ace has been initialised (doesn't have to be)
                if (this.editor) {
                    // set the ace editor value
                    this.editor.setValue(code, -1 /* set the cursor to -1 to stop highlighting everything */);
                }

                // if iframe has been initialised
                if (this.iframe) {
                    this.iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
                }

                if (typeof customFunction === "function") {
                    customFunction(this);
                }

            }.bind(this) /* bind parent scope */);
        else if (scope === "ace")
            this.editor.container.addEventListener(event, customFunction);
        else
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
     * @param {string} code - the HTML source
     * @returns {string} - the Blockly XML
     */
    codeToXML(code) {
        function idGen() {
            return Array(20).fill(0).map(() => [..."`0123456789!£$%^&*()_-+=;@}]{[#~.>,<?|:;", ...[..."abcdefghijklmnopqrstuvwxyz"].map(z => [z, z.toUpperCase()]).flat()][Math.floor(Math.random() * 81)]).join('')
        }

        let parallelTree = document.createElement("xml");
        parallelTree.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

        let tempId = Math.floor(Math.random() * 100000).toString();
        while (code.indexOf(tempId) > -1)
            tempId = Math.floor(Math.random() * 100000).toString();

        let bodifiedCode = (" " + code)
            .split(/((?<=[^\\]|^)(("((\\")|[^"])*[^\\]")|('((\\')|[^'])*[^\\]')))|((?<=([^\\]>)|^)((\\<)|([^<]))*[^\\](?=<))/g)
            .filter((_, z) => z % 14 === 0 || (_ && (z % 14 === 1 || z % 14 === 9)))
            .map((v, i) =>
                i % 2 === 0 ?
                    (!i ? v.substr(1) : v)
                        .toLowerCase()
                        .replace(/<\/?((html)|(head)|(body)|(style)|(base)|(link)|(meta)|(script)|(noscript))/g,
                            `$&Tag${tempId}`)
                        .replace("<!DOCTYPE html>", "<doctypeTag></doctypeTag>")
                    : v
            )
            .filter((_, z) => z ? z === 1 ? _ !== " " : true : _)
            .join('');

        console.log(bodifiedCode);

        let domParser = new DOMParser();
        let parsedHTML = domParser.parseFromString(bodifiedCode, "text/html").body;

        console.log(parsedHTML);

        const reconstruct = (parent, parallelParent) => {
            let parallelChildren = [];
            Array.from(parent.childNodes).forEach(child => {
                let newNode;
                let childrenContainer;
                switch (child.nodeName) {
                    case `HEADTAG${tempId}`:
                        newNode = document.createElement("block");
                        newNode.setAttribute("type", "head");
                        newNode.setAttribute("id", idGen());

                        childrenContainer = document.createElement("statement");
                        childrenContainer.setAttribute("name", "content");

                        newNode.appendChild(childrenContainer);
                        break;
                }

                if (child.childNodes.length)
                    reconstruct(child, childrenContainer);

                parallelChildren.push(newNode);
            });

            let newParent = parallelParent;
            parallelChildren.forEach((child, i) => {
                newParent.appendChild(child);

                if (i < parallelChildren.length - 1) {
                    let v = document.createElement("next");
                    child.appendChild(v);
                    newParent = v;
                }
            });
        };

        reconstruct(parsedHTML, parallelTree);

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
