const fs = require("fs");

function compileStyles(cb) {
    Object.defineProperty(Array.prototype, 'flat', {
        value: function (depth = 1) {
            return this.reduce(function (flat, toFlatten) {
                return flat.concat((Array.isArray(toFlatten) && (depth > 1)) ? toFlatten.flat(depth - 1) : toFlatten);
            }, []);
        }
    });

    function toJSON(filename) {
        let data = fs.readFileSync(filename);

        let css = " " + data;

        let cssObj = {};

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
                if (char === "'" || char === '"') {
                    if (!inString && css[i - 1] !== "\\") {
                        inString = char;
                    } else if (char === inString) {
                        inString = false;
                    }
                }

                if (!(css[i - 1] + char === "  " && !inString)) {
                    if (inBracket) {
                        bodySoFar += char;
                        if (char === "}") {
                            inBracket = false;

                            let selectorName = matchSoFar.replace(/{/g, "").trim();
                            let stringPoints = selectorName.split(new RegExp("((['\"])(\\\\.|[^'\"])*\\2)"));
                            let commaPoints = selectorName
                                .split('')
                                .reduce((a, e, i) => e === "," ? a.concat(i) : a, []);

                            let newStringPoints = [0];
                            for (let z = 0, point = stringPoints[0]; z < stringPoints.length; z++, point = stringPoints[z])
                                if (z % 4 === 0 || z % 4 === 1)
                                    newStringPoints.push(point.length + newStringPoints.slice().pop());

                            newStringPoints = newStringPoints.map(_ => [_, _]).flat().slice(1, -1);
                            newStringPoints = newStringPoints.map((r, n) => n % 2 === 1
                                && [newStringPoints[n - 1], r])
                                .filter(z => z);
                            newStringPoints = newStringPoints.filter((_, z) => z % 2);

                            let goodCommaPoints = commaPoints.filter(e =>
                                newStringPoints.every(t => {
                                    return t[0] > e || e > t[1];
                                })
                            );

                            let selectors = [];

                            let lastPoint = 0;
                            goodCommaPoints.forEach(point => {
                                selectors.push(
                                    selectorName
                                        .slice(lastPoint, point)
                                        .replace(/(^[{ ]*)|([{ ]*$)/g, "")
                                );

                                lastPoint = point + 1;
                            });
                            selectors.push(selectorName.slice(lastPoint));

                            selectors.forEach(selector => {
                                cssObj[selector.replace(/{/g, "").trim()] = bodySoFar
                                    .replace(/[\t\n\r]/g, "")
                                    .slice(0, -1)
                                    .trim();
                            });

                            matchSoFar = "";
                            bodySoFar = "";
                        }
                    } else {
                        matchSoFar += char;
                        if (char === "{") {
                            inBracket = true;
                        } else if (char === "\n") {
                            matchSoFar = "";
                        }
                    }
                }
            } else {
                if (css[i - 1] + char === "*/") inComment = false;
            }
        }

        return cssObj;
    }

    function toCSS(cssObj) {
        let writeStr = "";
        Array.from(Object.keys(cssObj)).forEach(selector => {
            writeStr += selector + "{" + cssObj[selector] + "}";
        });

        return writeStr.replace("( {2,})|(\n{2,})|(\t{2,})", "");
    }

    if (fs.existsSync("dist/ffau.css"))
        fs.unlinkSync("dist/ffau.css");

    function themify(list) {
        return list
            .map(f => "./src/themes/" + f)
            .filter(f => fs.existsSync(f));
    }

    let cssFiles = themify(
        fs.readdirSync("src/themes").filter(
            f =>
                f.endsWith(".css") &&
                !(
                    f.endsWith("__.css") &&
                    f.startsWith("__")
                )
        )
    );

    let globalFiles = themify(
        fs.readdirSync("src/themes").filter(
            f =>
                f.endsWith(".css") &&
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
        let newObj = Object.assign({}, json);
        let cssFileName = filename.split("/").slice().pop().slice(0, -4);

        Array.from(Object.keys(json)).forEach(key => {
            let newKey = key;

            if (["blocklyToolboxDiv", "blocklyTreeRoot", "blocklyTreeRow", "blocklyHidden",
                "blocklyTreeLabel", "blocklyTreeIcon", "blocklyTreeIconClosedLtr", "blocklyTreeIconNone",
                "blocklyTreeSeparator", "blocklySvg", "blocklyWorkspace", "blocklyMainBackground",
                "blocklyTrash", "blocklyBlockCanvas", "blocklyBubbleCanvas", "blocklyScrollbarBackground",
                "blocklyZoom", "blocklyScrollbarVertical", "blocklyMainWorkspaceScrollbar", "blocklyScrollbarHandle",
                "blocklyScrollbarHorizontal", "blocklyFlyout", "blocklyFlyoutBackground", "blocklyFlyoutScrollbar",
                "blocklyBlockDragSurface", "blocklyWsDragSurface", "blocklyOverflowVisible", "blocklyWidgetDiv",
                "blocklyTooltipDiv"]
                .some(prefix => key.trim().startsWith(prefix))) {
                newKey = "div.injectionDiv.blocklyTheme"
                    + cssFileName.charAt(0).toUpperCase()
                    + cssFileName.slice(1)
                    + " " + key
            }

            if (newKey !== key) {
                newObj[newKey] = newObj[key];
                delete newObj[key];
            }
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
            if (err) throw err;

            console.log("Success! See `dist/ffau.css` for output code, or use:");
            console.log('\t<link href="dist/ffau.css" rel="stylesheet">');
            console.log('in the <head> of your HTML file to import the new themes.');
        });

    cb();
}

exports.default = compileStyles;