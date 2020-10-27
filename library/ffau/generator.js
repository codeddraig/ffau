/*
        Ffau - A Blockly-based editor for teaching HTML, CSS and Javascript.

				Developed by Pal Kerecsenyi and Geza Kerecsenyi.
				Full details are available at the Github repo: https://github.com/codeddraig/ffau
				Ffau editor will not work without its libraries. The best way to get all
					off this data at once is to grab the latest release version from the
					Github repo or to install via NPM.
				Ffau is open source software. This means you can re-mix, share and use
					it however you want, including for commercial purposes. However, you
					MUST provide attribution to the original authors if you do this.
				However, Ffau is provided with NO WARRANTY whatsoever, and by using this
					software, you agree to the terms of the MIT License.

				Copyright (c) 2017-20 The CodeDdraig Organisation

				THIS IS VERSION 2.1.5
*/

function parseTransitions(block) {
    let stmt = '';
    const transitions = [];
    let index = -1;
    let thisBlock = block.childBlocks_[0];
    let i = 0;
    while (thisBlock) {
        if (thisBlock.type !== 'cssevents') {
            let blockText = htmlGen.blockToCode(thisBlock);
            if (thisBlock.getNextBlock()) {
                blockText = blockText.slice(
                    0,
                    -htmlGen.blockToCode(thisBlock.getNextBlock()).length,
                );
            }

            if (thisBlock.type !== 'transition') {
                stmt += '\t' + blockText;
            } else {
                if (transitions.length === 0) {
                    index = stmt.length;
                }

                const split = blockText.trim().split(' ');
                transitions.push({
                    duration: decodeURIComponent(split[0]),
                    property: decodeURIComponent(split[1]),
                    delay: decodeURIComponent(split[2]),
                    timingFunction: decodeURIComponent(split[3]),
                });
            }

            thisBlock = thisBlock.getNextBlock();
        } else {
            i++;
            thisBlock = block.childBlocks_[i];
        }
    }

    if (transitions.length) {
        const reducedStr = transitions.reduce((a, e) =>
                `${a},\n\t\t${e.property} ${e.duration}s ${e.timingFunction} ${e.delay}s`
            , '');

        const transitionStr = `\ttransition: ${reducedStr.trim().substr(1)};\n`;

        stmt = stmt.substr(0, index) + transitionStr + stmt.substr(index);
    }

    return stmt;
}

function hexEscape(str) {
    return str.replace(/[^A-Fa-f0-9]/, '').substring(0, 8).toLowerCase();
}

function fullEscape(input) {
    return escape(input)
        .replace(/%25/g, '%');
}

function looseEscape(input) {
    let stringToEscape = input;

    if (typeof input === 'number') {
        stringToEscape = input.toString();
    }

    return stringToEscape
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function cssEscape(input) {
    return input
        .replace(/;/g, '')
        .replace(/{/g, '')
        .replace(/}/g, '')
        .replace(/</g, '')
        .replace(/:/g, '')
        .replace(/"/g, '\'');
}

const URLRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
const hashRegex = /#([A-z0-9]*)/;

function isNewTabUrl(input) {
    return URLRegex.test(input) || (!input.includes('http://') && !input.includes('https://')) && !hashRegex.test(input) && input.length > 0;
}

/**
 * @return {string}
 */
function URLInput(input) {
    input = encodeURI(input);

    if (URLRegex.test(input) || hashRegex.test(input)) {
        return input;
    } else if (isNewTabUrl(input)) {
        return 'https://' + input;
    }
}

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const htmlGen = new Blockly.Generator('HTML');

htmlGen.init = function (workspace) {
};
htmlGen.finish = function (code) {
    return code;
};

htmlGen.suffixLines = function (text, suffix) {
    return text.replace(/(?!\n$)\n/g, suffix + '\n') + suffix;
};

htmlGen.getAncestors = function (block, ancestors) {
    if (block.parentBlock_) {
        ancestors.push(block.parentBlock_);
        ancestors.push(htmlGen.getAncestors(block.parentBlock_, ancestors));
    }

    return ancestors.filter(e => e.length === undefined);
};

// Called with each block/statement to pass onwards custom mapping
htmlGen.scrub_ = function (block, code) {
    const appendCommentCode = (comment, prefix, suffix) => {
        commentCode += `${prefix}${
            comment.includes('\n')
            ? `\n\t${comment.trim().split('\n').map(z => '\t' + z).join('\n').trim()}\n`
            : comment
        }${suffix}\n`;
    };

    let commentCode = '';

    if (!htmlGen.getAncestors(block, []).map(e => e.type).includes('stylearg')) {
        let comment = block.getCommentText();
        if (htmlGen.getAncestors(block, []).map(e => e.type).includes('style')) {
            if (comment) {
                comment = Blockly.utils.string.wrap(
                    comment,
                    htmlGen.COMMENT_WRAP - 3,
                ).replace(/\n*$|^\n*/g, '');
                appendCommentCode(comment, '/*', '*/');
            }
        } else {
            // Only collect comments for blocks that aren't inline.
            if ((!block.outputConnection || !block.outputConnection.targetConnection)
                && (block.parentBlock_
                    ?
                    (!block.parentBlock_.outputConnection || !block.parentBlock_.outputConnection.targetConnection)
                    : true)
            ) {
                // Collect comment for this block.
                if (comment) {
                    comment = Blockly.utils.string.wrap(
                        comment,
                        htmlGen.COMMENT_WRAP - 3,
                    ).replace(/\n*$|^\n*/g, '');
                    appendCommentCode(comment, '<!--', '-->');
                }
                // Collect comments for all value arguments.
                // Don't collect comments for nested statements.
                for (let i = 0; i < block.inputList.length; i++) {
                    if (block.inputList[i].type === Blockly.INPUT_VALUE) {
                        const childBlock = block.inputList[i].connection.targetBlock();
                        if (childBlock && childBlock.type !== 'style' && childBlock.type !== 'stylearg') {
                            const thisComment = htmlGen.allNestedComments(childBlock)
                                .replace(/\n*$|^\n*/g, '');
                            if (thisComment) {
                                appendCommentCode(thisComment, '<!--', '-->');
                            }
                        }
                    }
                }
            }
        }
    }

    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
    const nextCode = htmlGen.blockToCode(nextBlock);

    return commentCode + code + nextCode;
};

htmlGen['html'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const code = '<!DOCTYPE html>\n<html>\n' + statements_content + '</html>\n';
    return code;
};

htmlGen['head'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const code = '<head>\n' + statements_content + '</head>\n';
    return code;
};

htmlGen['metacharset'] = function (block) {
    const value = block.getFieldValue('value');
    const code = '<meta charset="' + value + '">\n';
    return code;
};

htmlGen['metaviewport'] = function (block) {
    const code = '<meta name="viewport" content="width=device-width, initial-scale=1">\n';
    return code;
};

htmlGen['title'] = function (block) {
    const value = block.getFieldValue('value');
    const code = `<title>${looseEscape(value)}</title>\n`;
    return code;
};

htmlGen['body'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC).trim();
    const code = '<body' + (block_modifier
                            ? ' ' + block_modifier.trim()
                            : '') + '>\n' + statements_content + '</body>\n';
    return code;
};

htmlGen['headertag'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<header' + (block_modifier
                              ? ' ' + block_modifier.trim()
                              : '') + '>\n' + statements_content + '</header>\n';
    return code;
};

htmlGen['footertag'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<footer' + (block_modifier
                              ? ' ' + block_modifier.trim()
                              : '') + '>\n' + statements_content + '</footer>\n';
    return code;
};

htmlGen['divider'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<div' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + statements_content + '</div>\n';
    return code;
};

htmlGen['linebreak'] = function (block) {
    return '<br/>\n';
};

htmlGen['hline'] = function (block) {
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<hr' + (block_modifier ? ' ' + block_modifier.trim() : '') + '/>\n';
};

htmlGen['style'] = function (block) {
    const statement = htmlGen.statementToCode(block, 'content');
    return '<style>\n' + statement + '</style>\n';
};

htmlGen['stylearg'] = function (block) {
    const statement = parseTransitions(block).trim();
    return 'style="' + statement + '" ';
};

htmlGen['cssitem'] = function (block) {
    const stmt = parseTransitions(block);

    let mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    mod = mod.split(' ').join(''); // remove spaces

    const selector = cssEscape(block.getFieldValue('selector'));

    return selector + mod + '{\n' + stmt + '}\n';
};

htmlGen['cssevents'] = function (block) {
    const stmt = block.getFieldValue('content');
    const mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = ':' + stmt + mod;
    return code;
};

htmlGen['cssnot'] = function (block) {
    const value = block.getFieldValue('content');
    const mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = ':not(' + cssEscape(value) + ')' + mod;
    return code;
};

htmlGen['fontfamily'] = function (block) {
    const value = block.getFieldValue('value');
    return 'font-family: ' + cssEscape(value) + ';\n';
};

htmlGen['fontsize'] = function (block) {
    const value = block.getFieldValue('value');
    return 'font-size: ' + fullEscape(value) + ';\n';
};

htmlGen['fontweight'] = function (block) {
    const weight = block.getFieldValue('weight');
    return `font-weight: ${weight};\n`;
};

htmlGen['textshadow-new'] = function (block) {
    const x = fullEscape(block.getFieldValue('xoffset'));
    const y = fullEscape(block.getFieldValue('yoffset'));
    const b = fullEscape(block.getFieldValue('blur'));
    const c = htmlGen.statementToCode(block, 'color', htmlGen.ORDER_ATOMIC).trim();

    return `text-shadow: ${x} ${y} ${b} ${c};\n`;
};

htmlGen['boxshadow-new'] = function (block) {
    const x = fullEscape(block.getFieldValue('x-offset'));
    const y = fullEscape(block.getFieldValue('y-offset'));
    const blur = fullEscape(block.getFieldValue('blur'));

    const color = htmlGen.statementToCode(block, 'color', htmlGen.ORDER_ATOMIC).trim();

    return `box-shadow: ${x} ${y} ${blur} ${color};\n`;
};

htmlGen['boxshadow-2'] = function (block) {
    const x = fullEscape(block.getFieldValue('xoffset'));
    const y = fullEscape(block.getFieldValue('yoffset'));
    const blur = fullEscape(block.getFieldValue('blur'));

    const color = htmlGen.statementToCode(block, 'color', htmlGen.ORDER_ATOMIC).trim();

    return `box-shadow: ${x} ${y} ${blur} ${color};\n`;
};

htmlGen['textshadow'] = function (block) {
    const x = fullEscape(block.getFieldValue('xoffset'));
    const y = fullEscape(block.getFieldValue('yoffset'));
    const b = fullEscape(block.getFieldValue('blur'));
    const c = block.getFieldValue('color');

    return `text-shadow: ${x} ${y} ${b} ${c};\n`;
};

htmlGen['boxshadow'] = function (block) {
    const x = fullEscape(block.getFieldValue('x-offset'));
    const y = fullEscape(block.getFieldValue('y-offset'));
    const blur = fullEscape(block.getFieldValue('blur'));

    const color = block.getFieldValue('color');

    return `box-shadow: ${x} ${y} ${blur} ${color};\n`;
};

htmlGen['texttransform'] = function (block) {
    const value = block.getFieldValue('value');
    return `text-transform: ${value};\n`;
};

htmlGen['textalign'] = function (block) {
    const value = block.getFieldValue('value');
    return `text-align: ${value};\n`;
};

htmlGen['letterspacing'] = function (block) {
    const value = block.getFieldValue('value');
    return `letter-spacing: ${fullEscape(value)};\n`;
};

htmlGen['margin'] = function (block) {
    const direction = block.getFieldValue('direction');
    const value = block.getFieldValue('value');
    return 'margin-' + direction + ': ' + fullEscape(value) + ';\n';
};

htmlGen['padding'] = function (block) {
    const direction = block.getFieldValue('direction');
    const value = block.getFieldValue('value');
    return 'padding-' + direction + ': ' + fullEscape(value) + ';\n';
};

htmlGen['display'] = function (block) {
    const value = block.getFieldValue('content');
    return 'display: ' + value + ';\n';
};

htmlGen['overflow'] = function (block) {
    const value = block.getFieldValue('content');
    const direction = block.getFieldValue('direction');

    return `overflow-${direction}: ${value};\n`;
};

htmlGen['color-new'] = function (block) {
    const color = htmlGen.statementToCode(block, 'value', htmlGen.ORDER_ATOMIC).trim();
    return 'color: ' + color + ';\n';
};

htmlGen['color'] = function (block) {
    const color = block.getFieldValue('value');
    return 'color: ' + color + ';\n';
};

htmlGen['colordropdown'] = function (block) {
    const color = block.getFieldValue('color');
    return `color: ${color};\n`;
};

htmlGen['linkhead'] = function (block) {
    const library = block.getFieldValue('library');

    let code;
    if (library === 'bootstrap') {
        code = '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zug+QiDoJOrZ5t4lssLdxGhVrurbmBWopoEl+M6BdEfwnCJZtKxi1KgxUyJq13dy" crossorigin="anonymous">\n';
    } else if (library === 'materialize') {
        code = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css">\n';
    } else if (library === 'magic') {
        code = '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/magical-css@latest/dist/magic.css">\n';
    }

    return code;
};

htmlGen['bgcolor-new'] = function (block) {
    const color = htmlGen.statementToCode(block, 'value', htmlGen.ORDER_ATOMIC).trim();
    return 'background-color: ' + color + ';\n';
};

htmlGen['bgcolor'] = function (block) {
    const color = block.getFieldValue('value');
    return 'background-color: ' + color + ';\n';
};

htmlGen['bgimage'] = function (block) {
    const content = block.getFieldValue('content');
    return 'background-image: url("' + URLInput(content) + '");\n';
};

htmlGen['bgposition'] = function (block) {
    const content = block.getFieldValue('content');
    return 'background-position: ' + content + ';\n';
};

htmlGen['bgrepeat'] = function (block) {
    const content = block.getFieldValue('content');
    const code = 'background-repeat: ' + content + ';\n';
    return code;
};

htmlGen['bgsize'] = function (block) {
    const content = block.getFieldValue('content');
    const code = 'background-size: ' + fullEscape(content) + ';\n';
    return code;
};

htmlGen['border-new'] = function (block) {
    const width = fullEscape(block.getFieldValue('width'));
    const type = block.getFieldValue('type');
    const color = htmlGen.statementToCode(block, 'color', htmlGen.ORDER_ATOMIC).trim();

    return 'border: ' + width + ' ' + type + ' ' + color + ';\n';
};

htmlGen['borderedge-new'] = function (block) {
    const edge = block.getFieldValue('edge');
    const width = fullEscape(block.getFieldValue('width'));
    const type = block.getFieldValue('type');
    const color = htmlGen.statementToCode(block, 'color', htmlGen.ORDER_ATOMIC).trim();

    return `border-${edge}: ${width} ${type} ${color};\n`;
};

htmlGen['border'] = function (block) {
    const width = fullEscape(block.getFieldValue('width'));
    const type = block.getFieldValue('type');
    const color = block.getFieldValue('color');

    return 'border: ' + width + 'px ' + type + ' ' + color + ';\n';
};

htmlGen['borderedge'] = function (block) {
    const edge = block.getFieldValue('edge');
    const width = fullEscape(block.getFieldValue('width'));
    const type = block.getFieldValue('type');
    const color = block.getFieldValue('color');

    return `border-${edge}: ${width}px ${type} ${color};\n`;
};

htmlGen['borderrad'] = function (block) {
    const content = block.getFieldValue('content');
    return 'border-radius: ' + fullEscape(content) + ';\n';
};

htmlGen['cursor'] = function (block) {
    const content = block.getFieldValue('content');
    return 'cursor: ' + content + ';\n';
};

htmlGen['bordercol'] = function (block) {
    const collapse = block.getFieldValue('value');

    let code;
    if (collapse === 'TRUE') {
        code = 'border-collapse: collapse;\n';
    } else {
        code = 'border-collapse: separate;\n';
    }

    return code;
};

htmlGen['width'] = function (block) {
    const size = block.getFieldValue('size');

    return 'width: ' + fullEscape(size) + ';\n';
};

htmlGen['height'] = function (block) {
    const size = block.getFieldValue('size');

    return 'height: ' + fullEscape(size) + ';\n';
};

htmlGen['widthheightnum'] = function (block) {
    const option = block.getFieldValue('option');
    const size = block.getFieldValue('size');

    return option + ': ' + fullEscape(size) + ';\n';
};

htmlGen['widthheight'] = function (block) {
    const option = block.getFieldValue('option');
    const value = block.getFieldValue('value');

    return option + ': ' + value + ';\n';
};

htmlGen['float'] = function (block) {
    return 'float: ' + block.getFieldValue('content') + ';\n';
};

htmlGen['verticalalign'] = function (block) {
    const align = block.getFieldValue('align');

    return `vertical-align: ${align};\n`;
};

htmlGen['transition'] = function (block) {
    const property = fullEscape(block.getFieldValue('transition-property')).trim();
    const duration = fullEscape(block.getFieldValue('duration')).trim();
    const delay = fullEscape(block.getFieldValue('delay')).trim();
    const timing = (htmlGen.statementToCode(block, 'timing-function', htmlGen.ORDER_ATOMIC) || 'linear').trim();

    if (!this.parentBlock_) {
        return `transition-property: ${property};\ntransition-duration: ${duration};\ntransition-delay: ${delay};\ntransition-timing-function: ${timing.trim()};\n`;
    } else {
        return `${duration} ${property} ${delay} ${encodeURIComponent(timing)}`;
    }
};

htmlGen['transitiontimingdropdown'] = function (block) {
    return block.getFieldValue('function');
};

htmlGen['transitiontimingbezier'] = function (block) {
    const bez1 = fullEscape(block.getFieldValue('bez1'));
    const bez2 = fullEscape(block.getFieldValue('bez2'));
    const bez3 = fullEscape(block.getFieldValue('bez3'));
    const bez4 = fullEscape(block.getFieldValue('bez4'));

    return `cubic-bezier(${bez1}, ${bez2}, ${bez3}, ${bez4})`;
};

htmlGen['othercss'] = function (block) {
    const property = fullEscape(block.getFieldValue('property'));

    const value = fullEscape(block.getFieldValue('value'))
        .replace(/%20/g, ' ')
        .replace(/%28/g, '(')
        .replace(/%29/g, ')');

    const code = property + ': ' + value + ';\n';
    return code;
};

htmlGen['args'] = function (block) {
    const code = htmlGen.statementToCode(block, 'content').trim();
    return code;
};

htmlGen['class'] = function (block) {
    const text_content = block.getFieldValue('content');
    return 'class="' + looseEscape(text_content) + '" ';
};

htmlGen['id'] = function (block) {
    const text_content = block.getFieldValue('content');
    return 'id="' + looseEscape(text_content) + '" ';
};

htmlGen['align'] = function (block) {
    return 'align="' + block.getFieldValue('content') + '" ';
};

htmlGen['emptyarg'] = function (block) {
    const property = block.getFieldValue('property');
    const value = block.getFieldValue('value');
    return fullEscape(property) + '="' + looseEscape(value) + '" ';
};

htmlGen['emptytext'] = function (block) {
    const text_content = block.getFieldValue('content');
    return '\n' + looseEscape(text_content) + '\n';
};

htmlGen['paragraph'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier');
    return '<p' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + statements_content + '</p>\n';
};

htmlGen['header'] = function (block) {
    const statements_content = htmlGen.statementToCode(block, 'content');
    const header_size = block.getFieldValue('size');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC).trim();
    return '<h' + (header_size + ' ' + block_modifier).trim() + '>' + statements_content + '</h' + header_size + '>\n';
};

htmlGen['textmod'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const type = block.getFieldValue('type');
    return '\n<' + type + '>' + content + '</' + type + '>\n';
};

htmlGen['span'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<span' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</span>';
};

htmlGen['link'] = function (block) {
    const text = htmlGen.statementToCode(block, 'content');
    const bareLink = block.getFieldValue('target');
    const link = URLInput(block.getFieldValue('target'));
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    let target = '';

    if (isNewTabUrl(bareLink)) {
        target = ' target="_blank"';
    }

    return '<a href="' + link + '"' + target + (block_modifier
                                                ? ' ' + block_modifier.trim()
                                                : '') + '>' + text + '</a>\n';
};

htmlGen['table'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<table' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</table>\n';
};

htmlGen['tablerow'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<tr' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</tr>\n';
};

htmlGen['tableheading'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<th' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</th>\n';
};

htmlGen['tabledata'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<td' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</td>\n';
};

htmlGen['form'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<form' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</form>\n';
};

htmlGen['input'] = function (block) {
    const type = block.getFieldValue('type');
    const value = looseEscape(block.getFieldValue('value'));
    const placeholder = looseEscape(block.getFieldValue('placeholder'));
    const name = looseEscape(block.getFieldValue('name'));

    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<input type="' + type + '" value="' + value + '" placeholder="' + placeholder + '" name="' + name + '"' + (block_modifier
                                                                                                                       ? ' ' + block_modifier.trim()
                                                                                                                       : '') + '>\n';
};

htmlGen['label'] = function (block) {
    const labelFor = block.getFieldValue('for');
    const content = htmlGen.statementToCode(block, 'content');

    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    return '<label for="' + looseEscape(labelFor) + '"' + (block_modifier
                                                           ? ' ' + block_modifier.trim()
                                                           : '') + '>' + content + '</label>\n';
};

htmlGen['image'] = function (block) {
    const source = block.getFieldValue('source');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<img src="' + (URLInput(source) || 'https://codedragon.org/img/no_image.png') + '"' + (block_modifier
                                                                                                         ? ' ' + block_modifier.trim()
                                                                                                         : '') + '>\n';
    return code;
};

htmlGen['orderedlist'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<ol' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</ol>\n';
    return code;
};

htmlGen['unorderedlist'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<ul' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</ul>\n';
    return code;
};

htmlGen['listitem'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<li' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</li>\n';
    return code;
};

htmlGen['details'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<details' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>\n' + content + '</details>\n';
    return code;
};

htmlGen['summary'] = function (block) {
    const content = htmlGen.statementToCode(block, 'content');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
    const code = '<summary' + (block_modifier ? ' ' + block_modifier.trim() : '') + '>' + content + '</summary>\n';
    return code;
};

htmlGen['rgba_picker'] = function (block) {
    const r = looseEscape(block.getFieldValue('r'));
    const g = looseEscape(block.getFieldValue('g'));
    const b = looseEscape(block.getFieldValue('b'));
    const a = looseEscape(block.getFieldValue('a'));

    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

htmlGen['hex_picker'] = function (block) {
    return '#' + hexEscape(block.getFieldValue('color'));
};

htmlGen['color_picker'] = function (block) {
    return looseEscape(Blockly.FieldColour.TITLES[Blockly.FieldColour.COLOURS.indexOf(block.getFieldValue('color'))]);
};

htmlGen['audio'] = function (block) {
    const source = block.getFieldValue('source');
    const loop = block.getFieldValue('loop');
    const autoplay = block.getFieldValue('autoplay');
    const controls = block.getFieldValue('controls');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);

    let code = '<audio' + (block_modifier ? ' ' + block_modifier.trim() : '');
    if (loop === 'TRUE') {
        code += ' loop';
    }
    if (autoplay === 'TRUE') {
        code += ' autoplay';
    }
    if (controls === 'TRUE') {
        code += ' controls';
    }

    let type;
    let url;
    switch (source) {
        case '8bit.ogg':
            url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/8bit.ogg?alt=media&token=be7cc7aa-08b2-4ca4-95bd-677111139c8f';
            type = 'audio/ogg';
            break;
        case 'classical.mp3':
            url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/classical.mp3?alt=media&token=f9a9f301-5dd2-4c3d-8857-f9883b584070';
            type = 'audio/mpeg';
            break;
        case 'happy.wav':
            url = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/happy.wav?alt=media&token=a7fcd6f6-7f5d-40c4-b172-c135471244b1';
            type = 'audio/wav';
            break;
    }

    code += '>\n<source src="' + url + '" type="' + type + '">\n</audio>\n';
    return code;
};

htmlGen['video'] = function (block) {
    let source = block.getFieldValue('source');
    const loop = block.getFieldValue('loop');
    const autoplay = block.getFieldValue('autoplay');
    const controls = block.getFieldValue('controls');
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);

    let code = '<video' + (block_modifier ? ' ' + block_modifier.trim() : '');
    if (loop === 'TRUE') {
        code += ' loop';
    }
    if (autoplay === 'TRUE') {
        code += ' autoplay';
    }
    if (controls === 'TRUE') {
        code += ' controls';
    }

    let type = 'video/mp4';
    switch (source) {
        case 'bbb':
            source = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/bigbuckbunny_trail_720p.mp4?alt=media&token=4795c3dd-9271-4801-96da-34da2f0c65d7';
            break;
        case 'ld':
            source = 'https://firebasestorage.googleapis.com/v0/b/cdr-app-firebase.appspot.com/o/llamadrama_720p.mp4?alt=media&token=5ce29fab-e766-44d1-bc99-481ee2fc63cd';
            break;
    }
    code += '>\n<source src="' + source + '" type="' + type + '">\n</video>\n';
    return code;
};

htmlGen['script'] = function (block) {
    const content = Blockly.JavaScript.statementToCode(block, 'content');
    const code = '<script>\n' + content + '\n</script>\n';
    return code;
};

htmlGen['chart'] = function (block) {
    const block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC).trim();
    const attributes = (block_modifier ? ' ' + block_modifier.trim() : '');
    const data = htmlGen.statementToCode(block, 'data', htmlGen.ORDER_ATOMIC);
    const title = looseEscape(block.getFieldValue('title'));
    const subtitle = looseEscape(block.getFieldValue('subtitle'));
    let chartType = block.getFieldValue('type');
    let chartOrientation = '';
    let chartLibrary;
    let chartOptions = 'options';

    if (chartType === 'Column') {
        chartType = 'Bar';
        chartOrientation = 'vertical';
        chartLibrary = 'charts';
    } else if (chartType === 'Bar') {
        chartOrientation = 'horizontal';
        chartLibrary = 'charts';
    } else {
        chartLibrary = 'visualization';
    }

    if (chartType !== 'PieChart') {
        chartOptions = `google.charts.${chartType}.convertOptions(options)`;
    }

    const divId = makeId(6);

    return `
<div id="${divId}" ${attributes}></div>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
  google.charts.load('current', {'packages':['bar', 'corechart']});
  google.charts.setOnLoadCallback(function() {
    const data = google.visualization.arrayToDataTable([${data}
    ]);
      
    const options = {
      chart: {
        title: '${title}',
        subtitle: '${subtitle}'
      },
      orientation: '${chartOrientation}'
    };
      
    const chart = new google.${chartLibrary}.${chartType}(document.getElementById('${divId}'));
    chart.draw(data, ${chartOptions});
  });
</script>\n`;
};

htmlGen['chart_row'] = function (block) {
    const columns = htmlGen.statementToCode(block, 'columns', htmlGen.ORDER_ATOMIC).trim();
    return `
    [${columns}],`;
};

htmlGen['chart_column'] = function (block) {
    let value = looseEscape(block.getFieldValue('value'));

    if (isNaN(value)) {
        value = `'${value}'`;
    }

    return `${value},`;
};

htmlGen['scrollspy'] = function (block) {
    const elementId = looseEscape(block.getFieldValue('element'));
    return `
<script src="https://cdn.jsdelivr.net/gh/cferdinandi/gumshoe@5.1/dist/gumshoe.polyfills.min.js"></script>
<script>
  new Gumshoe('#${elementId} a');
</script>\n`;
};

window.htmlGen = htmlGen;
