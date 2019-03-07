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

//Script tag
Blockly.Blocks['script'] = {
    init: function() {
        this.jsonInit({
            "message0": '<script> %1 %2 </script>',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content"
                }
            ],
            "previousStatement": "document",
            "nextStatement": "document",
            "colour": 210,
            "tooltip": "Script tag",
            "helpUrl": "https://www.w3schools.com/js/default.asp"
        });
    }
};

//HTML tag
Blockly.Blocks['html'] = {
    init: function() {
        this.jsonInit({
            "message0": '<html> %1 %2 </html>',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "document"
                }
            ],
            "colour": 210,
            "tooltip": "HTML tag",
            "helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
        });
    }
};

//Head tag
Blockly.Blocks['head'] = {
    init: function() {
        this.jsonInit({
            "message0": '<head> %1 %2 </head>',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "header"
                }
            ],
            "previousStatement": "document",
            "nextStatement": "document",
            "colour": 210,
            "tooltip": "Head tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_head.asp"
        });
    }
};

//Body tag
Blockly.Blocks['body'] = {
    init: function() {
        this.jsonInit({
            "message0": '<body> %1 %2 </body>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "html"
                }
            ],
            "previousStatement": "document",
            "nextStatement": "document",
            "colour": 210,
            "tooltip": "Body tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_body.asp"
        });
    }
};

//Meta Charset tag
Blockly.Blocks['metacharset'] = {
    init: function() {
        this.jsonInit({
            "message0": '<meta charset =  %1 >',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "value",
                    "options": [
                        [
                            "utf-8",
                            "utf-8"
                        ],
                        [
                            "utf-16",
                            "utf-16"
                        ]
                    ]
                },
            ],
            "previousStatement": "header",
            "nextStatement": "header",
            "colour": 210,
            "tooltip": "Meta charset tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_meta.asp"
        });
    }
};

Blockly.Blocks['metaviewport'] = {
    init:function(){
        this.jsonInit({
            "message0": "<meta name=\"viewport\">",
            "previousStatement": "header",
            "nextStatement": "header",
            "colour": 210,
            "tooltip": "Meta viewport (adds responsiveness)",
            "helpUrl": "https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag"
        });
    }
};

//header tag
Blockly.Blocks['headertag'] = {
    init: function() {
        this.jsonInit({
            "message0": '<header> %1 %2 </header>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "html"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 210,
            "tooltip": "header tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_header.asp"
        });
    }
};

//footer tag
Blockly.Blocks['footertag'] = {
    init: function() {
        this.jsonInit({
            "message0": '<footer> %1 %2 </footer>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "html"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 210,
            "tooltip": "footer tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_footer.asp"
        });
    }
};

//Title tag
Blockly.Blocks['title'] = {
    init: function() {
        this.jsonInit({
            "message0": '<title> %1 </title>',
            "args0": [
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "Untitled"
                }
            ],
            "previousStatement": "header",
            "nextStatement": "header",
            "colour": 210,
            "tooltip": "Title tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_title.asp"
        });
    }
};

//Divider tag
Blockly.Blocks['divider'] = {
    init: function() {
        this.jsonInit({
            "message0": '<div> %1 %2 </div>',
            "args0": [
                {
                    "type": "input_value",

                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": [
                        "html",
                        "textcontainer",
                        "form"
                    ]
                }
            ],
            "previousStatement": [
                "html",
                "form"
            ],
            "nextStatement": [
                "html",
                "form"
            ],
            "colour": 210,
            "tooltip": "Divider tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_div.asp"
        });
    }
};

//br tag
Blockly.Blocks['linebreak'] = {
    init: function() {
        this.jsonInit({
            "message0": '<br/>',
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 210,
            "tooltip": "Line break tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_br.asp"
        });
    }
};

//hr tag
Blockly.Blocks['hline'] = {
    init: function() {
        this.jsonInit({
            "message0": '<hr/> %1',
            "args0":[
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 210,
            "tooltip": "Horizontal line tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_hr.asp"
        });
    }
};

//Modifiers
Blockly.Blocks['args'] = {
    init: function() {
        this.jsonInit({
            "message0": 'attributes: %1 %2',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "args"
                }
            ],
            "colour": 120,
            "output": "attributes",
            "tooltip": "Additional attributes",
            "helpUrl": "https://www.w3schools.com/html/html_attributes.asp"
        });
    }
};
//Class
Blockly.Blocks['class'] = {
    init: function() {
        this.jsonInit({
            "message0": 'class = \" %1 \"',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": ""
                }
            ],
            "previousStatement": "args",
            "nextStatement": "args",
            "colour": 120,
            "tooltip": "Class attribute",
            "helpUrl": "https://www.w3schools.com/html/html_classes.asp"
        });
    }
};
//ID
Blockly.Blocks['id'] = {
    init: function() {
        this.jsonInit({
            "message0": 'id = \" %1 \"',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": ""
                }
            ],
            "previousStatement": "args",
            "nextStatement": "args",
            "colour": 120,
            "tooltip": "ID attribute",
            "helpUrl": "https://www.w3schools.com/tags/att_global_id.asp"
        });
    }
};

// Align attribute
Blockly.Blocks['align'] = {
    init: function() {
        this.jsonInit({
            "message0": 'align = \" %1 \"',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [ "left", "left" ],
                        [ "right", "right" ],
                        [ "middle", "middle" ],
                        [ "top", "top" ],
                        [ "bottom", "bottom" ]
                    ]
                }
            ],
            "previousStatement": "args",
            "nextStatement": "args",
            "colour": 120,
            "tooltip": "Align attribute",
            "helpUrl": "https://www.w3schools.com/tags/att_img_align.asp"
        });
    }
};

//Empty Argument
Blockly.Blocks['emptyarg'] = {
    init: function() {
        this.jsonInit({
            "message0": '%1 = \" %2 \"',
            "args0": [
                {
                    "type": "field_input",
                    "name": "property",
                    "text": "property"
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "value"
                }
            ],
            "previousStatement": "args",
            "nextStatement": "args",
            "colour": 120,
            "tooltip": "Empty modifier",
            "helpUrl": "https://www.w3schools.com/html/html_classes.asp"
        });
    }
};

//Style
Blockly.Blocks['style'] = {
    init: function() {
        this.jsonInit({
            "message0": '<style> %1 %2 </style>',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "style"
                }
            ],
            "previousStatement": "header",
            "nextStatement": "header",
            "colour": 290,
            "tooltip": "Style tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_style.asp"
        });
    }
};

//Style
Blockly.Blocks['stylearg'] = {
    init: function() {
        this.jsonInit({
            "message0": 'style = %1 %2',
            "args0": [
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "stylecontent"

                }
            ],
            "previousStatement": "args",
            "nextStatement": "args",
            "colour": 290,
            "tooltip": "Style modifier",
            "helpUrl": "https://www.w3schools.com/css/css_howto.asp"
        });
    }
};

//CSS Item
Blockly.Blocks['cssitem'] = {
    init: function() {
        this.jsonInit({
            "message0": '%1 { %2 %3 }',
            "args0": [
                {
                    "type": "field_input",
                    "name": "selector",
                    "text": "selector"
                },
                {
                    "type": "input_value",
                    "name": "modifier",
                    "check": "cssevents"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "stylecontent"
                }
            ],
            "previousStatement": "style",
            "nextStatement": "style",
            "colour": 290,
            "tooltip": "Style container",
            "helpUrl": "https://www.w3schools.com/cssref/css_selectors.asp"
        });
    }
};

//CSS Event selector
Blockly.Blocks['cssevents'] = {
    init: function() {
        this.jsonInit({
            "message0": ': %1 %2',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            ":after",
                            ":after"
                        ],
                        [
                            ":before",
                            ":before"
                        ],
                        [
                            "focus",
                            "focus"
                        ],
                        [
                            "hover",
                            "hover"
                        ]
                    ]
                },
                {
                    "type": "input_value",
                    "name": "modifier",
                    "check": "cssevents"
                }
            ],
            "output": "cssevents",
            "colour": 290,
            "tooltip": "CSS Events Selector",
            "helpUrl": ""
        });
    }
};

//CSS Event selector
Blockly.Blocks['cssnot'] = {
    init: function() {
        this.jsonInit({
            "message0": ':not( %1 ) %2',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": "selector"
                },
                {
                    "type": "input_value",
                    "name": "modifier",
                    "check": "cssevents"
                }
            ],
            "output": "cssevents",
            "colour": 290,
            "tooltip": "CSS 'Not' Selector",
            "helpUrl": ""
        });
    }
};

//Font-family
Blockly.Blocks['fontfamily'] = {
    init: function() {
        this.jsonInit({
            "message0": 'font-family: %1 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "sans-serif"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS font-family",
            "helpUrl": "https://www.w3schools.com/cssref/pr_font_font-family.asp"
        });
    }
};

//Font-size
Blockly.Blocks['fontsize'] = {
    init: function() {
        this.jsonInit({
            "message0": 'font-size: %1 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "12px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS font-size",
            "helpUrl": "https://www.w3schools.com/cssref/pr_font_font-size.asp"
        });
    }
};

//Margin
Blockly.Blocks['margin'] = {
    init: function() {
        this.jsonInit({
            "message0": 'margin - %1 : %2 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        [
                            "top",
                            "top"
                        ],
                        [
                            "right",
                            "right"
                        ],
                        [
                            "bottom",
                            "bottom"
                        ],
                        [
                            "left",
                            "left"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "15px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Margin",
            "helpUrl": "https://www.w3schools.com/cssref/pr_margin.asp"
        });
    }
};

//padding
Blockly.Blocks['padding'] = {
    init: function() {
        this.jsonInit({
            "message0": 'padding - %1 : %2 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        [
                            "top",
                            "top"
                        ],
                        [
                            "right",
                            "right"
                        ],
                        [
                            "bottom",
                            "bottom"
                        ],
                        [
                            "left",
                            "left"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "15px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Padding",
            "helpUrl": "https://www.w3schools.com/cssref/pr_padding.asp"
        });
    }
};

//Color
Blockly.Blocks['color'] = {
    init: function() {
        this.jsonInit({
            "message0": 'color: %1 ;',
            "args0": [
                {
                    "type": "field_colour",
                    "name": "value",
                    "colour": "#339999"

                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Color",
            "helpUrl": "https://www.w3schools.com/cssref/pr_text_color.asp"
        });
    }
};

//display
Blockly.Blocks['display'] = {
    init: function() {
        this.jsonInit({
            "message0": 'display: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "inline",
                            "inline"
                        ],
                        [
                            "inline-block",
                            "inline-block"
                        ],
                        [
                            "block",
                            "block"
                        ],
                        [
                            "flex",
                            "flex"
                        ],
                        [
                            "none",
                            "none"
                        ],
                        [
                            "inline-table",
                            "inline-table"
                        ],
                        [
                            "table",
                            "table"
                        ],
                        [
                            "inline-flex",
                            "inline-flex"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Display",
            "helpUrl": "https://www.w3schools.com/cssref/pr_class_display.asp"
        });
    }
};

//Overflow
Blockly.Blocks['overflow'] = {
    init: function() {
        this.jsonInit({
            "message0": 'overflow: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "visible",
                            "visible"
                        ],
                        [
                            "auto",
                            "auto"
                        ],
                        [
                            "hidden",
                            "hidden"
                        ],
                        [
                            "scroll",
                            "scroll"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Overflow",
            "helpUrl": "https://www.w3schools.com/cssref/pr_pos_overflow.asp"
        });
    }
};

//Text shadow
Blockly.Blocks['textshadow'] = {
    init: function(){
        this.jsonInit({
            "message0": 'text-shadow: %1 %2 %3 %4 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "xoffset",
                    "text": "x-offset"
                },
                {
                    "type": "field_input",
                    "name": "yoffset",
                    "text": "y-offset"
                },
                {
                    "type": "field_input",
                    "name": "blur",
                    "text": "blur"
                },
                {
                    "type": "field_colour",
                    "name": "color",
                    "colour": "#333333"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Text-shadow",
            "helpUrl": "https://www.w3schools.com/cssref/css3_pr_text-shadow.asp"
        });
    }
};

// Box-shadow
Blockly.Blocks['boxshadow'] = {
    init: function() {
        this.jsonInit({
            "message0": "box-shadow: %1 %2 %3 %4 ;",
            "args0": [
                {
                    "type": "field_input",
                    "name": "x-offset",
                    "text": "x-offset"
                },
                {
                    "type": "field_input",
                    "name": "y-offset",
                    "text": "y-offset"
                },
                {
                    "type": "field_input",
                    "name": "blur",
                    "text": "blur"
                },
                {
                    "type": "field_colour",
                    "name": "color",
                    "colour": "#333333"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS box shadow",
            "helpUrl": "https://www.w3schools.com/cssref/css3_pr_box-shadow.asp"
        })
    }
};

//BGColor
Blockly.Blocks['bgcolor'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-color: %1 ;',
            "args0": [
                {
                    "type": "field_colour",
                    "name": "value",
                    "colour": "#339999"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Background-Color",
            "helpUrl": "https://www.w3schools.com/css/css_background.asp"
        });
    }
};

//BGImage
Blockly.Blocks['bgimage'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-image: url( \" %1 \" );',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": "image"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-image CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-image.asp"
        });
    }
};

//BGPosition
Blockly.Blocks['bgposition'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-position: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "left top",
                            "left top"
                        ],
                        [
                            "left center",
                            "left"
                        ],
                        [
                            "left bottom",
                            "left bottom"
                        ],
                        [
                            "center top",
                            "center top"
                        ],
                        [
                            "center center",
                            "center"
                        ],
                        [
                            "center bottom",
                            "center bottom"
                        ],
                        [
                            "right top",
                            "right top"
                        ],
                        [
                            "right center",
                            "right"
                        ],
                        [
                            "right bottom",
                            "right bottom"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ],
                        [
                            "initial",
                            "initial"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-position CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-position.asp"
        });
    }
};

//padding
Blockly.Blocks['padding'] = {
    init: function() {
        this.jsonInit({
            "message0": 'padding - %1 : %2 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "direction",
                    "options": [
                        [
                            "top",
                            "top"
                        ],
                        [
                            "right",
                            "right"
                        ],
                        [
                            "bottom",
                            "bottom"
                        ],
                        [
                            "left",
                            "left"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "15px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Padding",
            "helpUrl": "https://www.w3schools.com/cssref/pr_padding.asp"
        });
    }
};
//BGRepeat
Blockly.Blocks['bgrepeat'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-repeat: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "repeat",
                            "repeat"
                        ],
                        [
                            "repeat-x",
                            "repeat-x"
                        ],
                        [
                            "repeat-y",
                            "repeat-y"
                        ],
                        [
                            "no-repeat",
                            "no-repeat"
                        ],
                        [
                            "space",
                            "space"
                        ],
                        [
                            "round",
                            "round"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-repeat CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-repeat.asp"
        });
    }
};
//display
Blockly.Blocks['display'] = {
    init: function() {
        this.jsonInit({
            "message0": 'display: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "inline",
                            "inline"
                        ],
                        [
                            "inline-block",
                            "inline-block"
                        ],
                        [
                            "block",
                            "block"
                        ],
                        [
                            "flex",
                            "flex"
                        ],
                        [
                            "none",
                            "none"
                        ],
                        [
                            "inline-table",
                            "inline-table"
                        ],
                        [
                            "table",
                            "table"
                        ],
                        [
                            "inline-flex",
                            "inline-flex"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Display",
            "helpUrl": "https://www.w3schools.com/cssref/pr_class_display.asp"
        });
    }
};

//Overflow
Blockly.Blocks['overflow'] = {
    init: function() {
        this.jsonInit({
            "message0": 'overflow-%1: %2 ;',
            "args0": [
                {
                    type: "field_dropdown",
                    name: "direction",
                    options: [
                        [
                            "x",
                            "x"
                        ],
                        [
                            "y",
                            "y"
                        ]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "visible",
                            "visible"
                        ],
                        [
                            "auto",
                            "auto"
                        ],
                        [
                            "hidden",
                            "hidden"
                        ],
                        [
                            "scroll",
                            "scroll"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Overflow",
            "helpUrl": "https://www.w3schools.com/cssref/pr_pos_overflow.asp"
        });
    }
};

//Text shadow
Blockly.Blocks['textshadow'] = {
    init: function(){
        this.jsonInit({
            "message0": 'text-shadow: %1 %2 %3 %4 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "xoffset",
                    "text": "x-offset"
                },
                {
                    "type": "field_input",
                    "name": "yoffset",
                    "text": "y-offset"
                },
                {
                    "type": "field_input",
                    "name": "blur",
                    "text": "blur"
                },
                {
                    "type": "field_colour",
                    "name": "color",
                    "colour": "#333333"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Text-shadow",
            "helpUrl": "https://www.w3schools.com/cssref/css3_pr_text-shadow.asp"
        });
    }
};

// Text transform
Blockly.Blocks['texttransform'] = {
    init: function(){
        this.jsonInit({
            "message0": "text-transform: %1 ;",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "value",
                    "options": [
                        ["none", "none"],
                        ["capitalize", "capitalize"],
                        ["uppercase", "uppercase"],
                        ["lowercase", "lowercase"],
                        ["initial", "initial"],
                        ["inherit", "inherit"]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Text-transform",
            "helpUrl": "https://www.w3schools.com/cssref/pr_text_text-transform.asp"
        });
    }
};

Blockly.Blocks['textalign'] = {
    init: function(){
        this.jsonInit({
            "message0": "text-align: %1 ;",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "value",
                    "options": [
                        ["center", "center"],
                        ["left", "left"],
                        ["right", "right"],
                        ["justify", "justify"]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Text-align",
            "helpUrl": "https://www.w3schools.com/cssref/pr_text_text-align.asp"
        })
    }
};

Blockly.Blocks['letterspacing'] = {
    init: function(){
        this.jsonInit({
            "message0": "letter-spacing: %1 ;",
            "args0": [
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "0px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Letter-spacing",
            "helpUrl": "https://www.w3schools.com/cssref/pr_text_letter-spacing.asp"
        });
    }
};

//BGColor
Blockly.Blocks['bgcolor'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-color: %1 ;',
            "args0": [
                {
                    "type": "field_colour",
                    "name": "value",
                    "colour": "#339999"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Background-Color",
            "helpUrl": "https://www.w3schools.com/css/css_background.asp"
        });
    }
};

//BGImage
Blockly.Blocks['bgimage'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-image: url( \" %1 \" );',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": "image"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-image CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-image.asp"
        });
    }
};

//BGPosition
Blockly.Blocks['bgposition'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-position: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "left top",
                            "left top"
                        ],
                        [
                            "left center",
                            "left"
                        ],
                        [
                            "left bottom",
                            "left bottom"
                        ],
                        [
                            "center top",
                            "center top"
                        ],
                        [
                            "center center",
                            "center"
                        ],
                        [
                            "center bottom",
                            "center bottom"
                        ],
                        [
                            "right top",
                            "right top"
                        ],
                        [
                            "right center",
                            "right"
                        ],
                        [
                            "right bottom",
                            "right bottom"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ],
                        [
                            "initial",
                            "initial"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-position CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-position.asp"
        });
    }
};

//BGRepeat
Blockly.Blocks['bgrepeat'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-repeat: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "repeat",
                            "repeat"
                        ],
                        [
                            "repeat-x",
                            "repeat-x"
                        ],
                        [
                            "repeat-y",
                            "repeat-y"
                        ],
                        [
                            "no-repeat",
                            "no-repeat"
                        ],
                        [
                            "space",
                            "space"
                        ],
                        [
                            "round",
                            "round"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-repeat CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-repeat.asp"
        });
    }
};

//BGSize
Blockly.Blocks['bgsize'] = {
    init: function() {
        this.jsonInit({
            "message0": 'background-size: %1 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": "15px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Background-size CSS property",
            "helpUrl": "https://www.w3schools.com/cssref/pr_background-size.asp"
        });
    }
};

//Border
Blockly.Blocks['border'] = {
    init: function() {
        this.jsonInit({
            "message0": 'border: %1 px %2 %3 ;',
            "args0": [
                {
                    "type": "field_number",
                    "name": "width",
                    "value": 5,
                    "min": 0
                },
                {
                    "type": "field_dropdown",
                    "name": "type",
                    "options": [
                        [
                            "none",
                            "none"
                        ],
                        [
                            "solid",
                            "solid"
                        ],
                        [
                            "dotted",
                            "dotted"
                        ],
                        [
                            "dashed",
                            "dashed"
                        ],
                        [
                            "double",
                            "double"
                        ],
                        [
                            "groove",
                            "groove"
                        ],
                        [
                            "ridge",
                            "ridge"
                        ],
                        [
                            "inset",
                            "inset"
                        ],
                        [
                            "outset",
                            "outset"
                        ]
                    ]
                },
                {
                    "type": "field_colour",
                    "name": "color",
                    "colour": "#000000"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Border",
            "helpUrl": "https://www.w3schools.com/css/css_border.asp"
        });
    }
};

//Border Collapse
Blockly.Blocks['bordercol'] = {
    init: function(){
        this.jsonInit({
            "message0": 'border-collapse: %1 ;',
            "args0": [
                {
                    "type": "field_checkbox",
                    "name": "value",
                    "checked": true
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Border collapse",
            "helpUrl": "https://www.w3schools.com/cssref/pr_border-collapse.asp"
        });
    }
};

//Border radius
Blockly.Blocks['borderrad'] = {
    init: function(){
        this.jsonInit({
            "message0": 'border-radius: %1 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": "10px"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Border Radius",
            "helpUrl": "https://www.w3schools.com/cssref/pr_border-radius.asp"
        });
    }
};

//Cursor
Blockly.Blocks['cursor'] = {
    init: function() {
        this.jsonInit({
            "message0": 'cursor: %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [
                            "alias",
                            "alias"
                        ],
                        [
                            "all-scroll",
                            "all-scroll"
                        ],
                        [
                            "auto",
                            "auto"
                        ],
                        [
                            "wait",
                            "wait"
                        ],
                        [
                            "zoom-in",
                            "zoom-in"
                        ],
                        [
                            "zoom-out",
                            "zoom-out"
                        ],
                        [
                            "cell",
                            "cell"
                        ],
                        [
                            "s-resize",
                            "s-resize"
                        ],
                        [
                            "se-resize",
                            "se-resize"
                        ],
                        [
                            "sw-resize",
                            "sw-resize"
                        ],
                        [
                            "text",
                            "text"
                        ],
                        [
                            "context-menu",
                            "context-menu"
                        ],
                        [
                            "col-resize",
                            "col-resize"
                        ],
                        [
                            "option",
                            "option"
                        ],
                        [
                            "copy",
                            "copy"
                        ],
                        [
                            "crosshair",
                            "crosshair"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ],
                        [
                            "default",
                            "default"
                        ],
                        [
                            "e-resize",
                            "e-resize"
                        ],
                        [
                            "ew-resize",
                            "ew-resize"
                        ],
                        [
                            "grab",
                            "grab"
                        ],
                        [
                            "grabbing",
                            "grabbing"
                        ],
                        [
                            "help",
                            "help"
                        ],
                        [
                            "ns-resize",
                            "ns-resize"
                        ],
                        [
                            "nw-resize",
                            "nw-resize"
                        ],
                        [
                            "nwse-resize",
                            "nwse-resize"
                        ],
                        [
                            "no-drop",
                            "no-drop"
                        ],
                        [
                            "none",
                            "none"
                        ],
                        [
                            "not-allowed",
                            "not-allowed"
                        ],
                        [
                            "pointer",
                            "pointer"
                        ],
                        [
                            "progress",
                            "progress"
                        ],
                        [
                            "row-resize",
                            "row-resize"
                        ],
                        [
                            "s-resize",
                            "s-resize"
                        ],
                        [
                            "move",
                            "move"
                        ],
                        [
                            "n-resize",
                            "n-resize"
                        ],
                        [
                            "nw-resize",
                            "nw-resize"
                        ],
                        [
                            "nesw-resize",
                            "nesw-resize"
                        ],
                        [
                            "vertical-text",
                            "vertical-text"
                        ],
                        [
                            "w-resize",
                            "nesw-resize"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Cursor",
            "helpUrl": "https://www.w3schools.com/cssref/pr_cursor.asp"
        });
    }
};

Blockly.Blocks['linkhead'] = {
    init: function(){
        this.jsonInit({
            "message0": '<link rel = \"stylesheet\"  src = \" %1 \">',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "library",
                    "options": [
                        [
                            "materialize.css",
                            "materialize"
                        ],
                        [
                            "bootstrap.css",
                            "bootstrap"
                        ],
                        [
                            "magic.css",
                            "magic"
                        ]
                    ]
                }
            ],
            "previousStatement": "header",
            "nextStatement": "header",
            "colour": 290,
            "tooltip": "Import CSS Library",
            "helpUrl": ""
        });
    }
};

//Width height number selector
Blockly.Blocks['widthheightnum'] = {
    init: function(){
        this.jsonInit({
            "message0": '%1 : %2;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "option",
                    "options": [
                        [
                            "width",
                            "width"
                        ],
                        [
                            "height",
                            "height"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "size",
                    "text": "100%"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Width/height",
            "helpUrl": "https://www.w3schools.com/css/css_dimension.asp"
        });
    }
};

//Width height number selector
Blockly.Blocks['widthheight'] = {
    init: function(){
        this.jsonInit({
            "message0": '%1 : %2 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "option",
                    "options": [
                        [
                            "width",
                            "width"
                        ],
                        [
                            "height",
                            "height"
                        ]
                    ]
                },
                {
                    "type": "field_dropdown",
                    "name": "value",
                    "options": [
                        [
                            "auto",
                            "auto"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "CSS Width/height",
            "helpUrl": "https://www.w3schools.com/css/css_dimension.asp"
        });
    }
};

// Float (CSS-version of 'align')
Blockly.Blocks['float'] = {
    init: function() {
        this.jsonInit({
            "message0": 'float : %1 ;',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "content",
                    "options": [
                        [ 'left', 'left' ],
                        [ 'right', 'right' ],
                        [ 'none', 'none' ],
                        [ 'initial', 'initial' ],
                        [ 'inherit', 'inherit' ]
                    ]
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Float an element left or right",
            "helpUrl": "https://www.w3schools.com/cssref/pr_class_float.asp"
        });
    }
};

// transition property
Blockly.Blocks['transition'] = {
    init: function() {
        this.jsonInit({
            "message0": "transition-property: %1 %2 transition-duration: %3 s %4 transition-delay: %5 s %6 transition-timing-function: %7",
            "args0": [
                {
                    "type": "field_input",
                    "name": "transition-property",
                    "text": "background-color"
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_number",
                    "name": "duration",
                    "value": 0.1
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "field_number",
                    "name": "delay",
                    "value": 0
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_value",
                    "name": "timing-function",
                    "check": "timing-function"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 270,
            "tooltip": "CSS transition template",
            "helpUrl": "https://www.w3schools.com/css/css3_transitions.asp"
        })
    }
};

// transition timing (options)
Blockly.Blocks['transitiontimingdropdown'] = {
    init: function() {
        this.jsonInit({
            "message0": "%1",
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "function",
                    "options": [
                        [
                            "ease",
                            "ease"
                        ],
                        [
                            "linear",
                            "linear"
                        ],
                        [
                            "ease-in",
                            "ease-in"
                        ],
                        [
                            "ease-out",
                            "ease-out"
                        ],
                        [
                            "ease-in-out",
                            "ease-in-out"
                        ],
                        [
                            "step-start",
                            "step-start"
                        ],
                        [
                            "step-end",
                            "step-end"
                        ],
                        [
                            "initial",
                            "initial"
                        ],
                        [
                            "inherit",
                            "inherit"
                        ]
                    ]
                }
            ],
            "output": "timing-function",
            "colour": 270,
            "tooltip": "CSS timing function options",
            "helpUrl": "https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp"
        })
    }
};

// transition timing (cubic bezier)
Blockly.Blocks['transitiontimingbezier'] = {
    init: function() {
        this.jsonInit({
            "message0": "cubic-bezier( %1 , %2 , %3 , %4 )",
            "args0": [
                {
                    "type": "field_number",
                    "name": "bez1",
                    "value": 0,
                    "min": 0,
                    "max": 1
                },
                {
                    "type": "field_number",
                    "name": "bez2",
                    "value": 0,
                    "min": -5,
                    "max": 5
                },
                {
                    "type": "field_number",
                    "name": "bez3",
                    "value": 0,
                    "min": 0,
                    "max": 1
                },
                {
                    "type": "field_number",
                    "name": "bez4",
                    "value": 0,
                    "min": -5,
                    "max": 5
                }
            ],
            "output": "timing-function",
            "colour": 270,
            "tooltip": "CSS cubic bezier timing function",
            "helpUrl": "https://www.w3schools.com/cssref/func_cubic-bezier.asp"
        })
    }
};

// Other CSS
Blockly.Blocks['othercss'] = {
    init: function() {
        this.jsonInit({
            "message0": '%1 : %2 ;',
            "args0": [
                {
                    "type": "field_input",
                    "name": "property",
                    "text": "property"
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": "value"
                }
            ],
            "previousStatement": "stylecontent",
            "nextStatement": "stylecontent",
            "colour": 290,
            "tooltip": "Any other CSS tag",
            "helpUrl": "https://www.w3schools.com/css/default.asp"
        });
    }
};

//empty text
Blockly.Blocks['emptytext'] = {
    init: function() {
        this.jsonInit({
            "message0": 'text %1',
            "args0": [
                {
                    "type": "field_input",
                    "name": "content",
                    "text": ""
                }
            ],
            "previousStatement": "textcontainer",
            "nextStatement": "textcontainer",
            "colour": 65,
            "tooltip": "Text",
            "helpUrl": ""
        });
    }
};

//Text modifier
Blockly.Blocks['textmod'] = {
    init: function() {
        this.jsonInit({
            "message0": '< %1 > %2 %3 </>',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "type",
                    "options": [
                        [
                            "strong",
                            "strong"
                        ],
                        [
                            "em",
                            "em"
                        ],
                        [
                            "mark",
                            "mark"
                        ],
                        [
                            "small",
                            "small"
                        ],
                        [
                            "big",
                            "big"
                        ],
                        [
                            "del",
                            "del"
                        ],
                        [
                            "ins",
                            "ins"
                        ],
                        [
                            "sub",
                            "sub"
                        ],
                        [
                            "sup",
                            "sup"
                        ],
                        [
                            "code",
                            "code"
                        ],
                        [
                            "q",
                            "q"
                        ],
                        [
                            "aside",
                            "aside"
                        ],
                        [
                            "blockquote",
                            "blockquote"
                        ],
                        [
                            "legend",
                            "legend"
                        ],
                        [
                            "cite",
                            "cite"
                        ]
                    ]
                },
                {
                    "type": "input_dummy"
                },
                {
                    "type": "input_statement",
                    "name": "content"
                }
            ],
            "previousStatement": "textcontainer",
            "nextStatement": "textcontainer",
            "colour": 65,
            "tooltip": "Text modifier - used to achieve formatting effects with text",
            "helpUrl": "https://www.w3schools.com/html/html_formatting.asp"
        });
    }
};

//p tag
Blockly.Blocks['paragraph'] = {
    init: function() {
        this.jsonInit({
            "message0": '<p> %1 %2 </p>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 65,
            "tooltip": "Paragraph tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_p.asp"
        });
    }
};

//header tag
Blockly.Blocks['header'] = {
    init: function() {
        this.jsonInit({
            "message0": '<h %1 > %2 %3 </h>',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "size",
                    "options": [
                        [
                            "1",
                            "1"
                        ],
                        [
                            "2",
                            "2"
                        ],
                        [
                            "3",
                            "3"
                        ],
                        [
                            "4",
                            "4"
                        ],
                        [
                            "5",
                            "5"
                        ],
                        [
                            "6",
                            "6"
                        ],
                    ]
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 65,
            "tooltip": "Header tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_hn.asp"
        });
    }
};

Blockly.Blocks['link'] = {
    init: function() {
        this.jsonInit({
            "message0": '<a href=\" %1 \"> %2 %3 </a>',
            "args0": [
                {
                    "type": "field_input",
                    "name": "target",
                    "text": "http://"
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": "textcontainer",
            "nextStatement": "textcontainer",
            "colour": 65,
            "tooltip": "Paragraph tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_p.asp"
        });
    }
};

//Span tag
Blockly.Blocks['span'] = {
    init: function() {
        this.jsonInit({
            "message0": '<span> %1 %2 </span>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": "textcontainer",
            "nextStatement": "textcontainer",
            "colour": 65,
            "tooltip": "Span tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_span.asp"
        });
    }
};

//Table tag
Blockly.Blocks['table'] = {
    init: function() {
        this.jsonInit({
            "message0": '<table> %1 %2 </table>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "table"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 20,
            "tooltip": "Table tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_table.asp"
        });
    }
};

//TR tag
Blockly.Blocks['tablerow'] = {
    init: function() {
        this.jsonInit({
            "message0": '<tr> %1 %2 </tr>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "tablerow"
                }
            ],
            "previousStatement": "table",
            "nextStatement": "table",
            "colour": 20,
            "tooltip": "Table row tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_tr.asp"
        });
    }
};

//TH tag
Blockly.Blocks['tableheading'] = {
    init: function() {
        this.jsonInit({
            "message0": '<th> %1 %2 </th>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": ["html","textcontainer"]
                }
            ],
            "previousStatement": "tablerow",
            "nextStatement": "tablerow",
            "colour": 20,
            "tooltip": "Table heading tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_th.asp"
        });
    }
};

//TD tag
Blockly.Blocks['tabledata'] = {
    init: function() {
        this.jsonInit({
            "message0": '<td> %1 %2 </td>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": ["html","textcontainer"]
                }
            ],
            "previousStatement": "tablerow",
            "nextStatement": "tablerow",
            "colour": 20,
            "tooltip": "Table data tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_td.asp"
        });
    }
};

//FORMS
//Form tag
Blockly.Blocks['form'] = {
    init: function() {
        this.jsonInit({
            "message0": '<form> %1 %2 </form>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "form"

                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 160,
            "tooltip": "Form tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_form.asp"
        });
    }
};

//Input tag
Blockly.Blocks['input'] = {
    init: function() {
        this.jsonInit({
            "message0": '<input type = \" %1 \" value = \" %2 \" placeholder = \" %3 \" name = \" %4 \" > %5',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "type",
                    "options": [
                        [
                            "submit",
                            "submit"
                        ],
                        [
                            "checkbox",
                            "checkbox"
                        ],
                        [
                            "color",
                            "color"
                        ],
                        [
                            "date",
                            "date"
                        ],
                        [
                            "datetime-local",
                            "datetime-local"
                        ],
                        [
                            "email",
                            "email"
                        ],
                        [
                            "hidden",
                            "hidden"
                        ],
                        [
                            "month",
                            "month"
                        ],
                        [
                            "number",
                            "number"
                        ],
                        [
                            "password",
                            "password"
                        ],
                        [
                            "radio",
                            "radio"
                        ],
                        [
                            "range",
                            "range"
                        ],
                        [
                            "text",
                            "text"
                        ],
                        [
                            "time",
                            "time"
                        ],
                        [
                            "week",
                            "week"
                        ]
                    ]
                },
                {
                    "type": "field_input",
                    "name": "value",
                    "text": ""
                },
                {
                    "type": "field_input",
                    "name": "placeholder",
                    "text": ""
                },
                {
                    "type": "field_input",
                    "name": "name",
                    "text": ""
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes",
                }
            ],
            "previousStatement": "form",
            "nextStatement": "form",
            "colour": 160,
            "tooltip": "Input tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_input.asp"
        });
    }
};

//Label tag
Blockly.Blocks['label'] = {
    init: function() {
        this.jsonInit({
            "message0": '<label for = \" %1 \" > %2 %3 </label>',
            "args0": [
                {
                    "type": "field_input",
                    "name": "for",
                    "text": "id"
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": [
                "html",
                "form"
            ],
            "nextStatement": [
                "html",
                "form"
            ],
            "colour": 160,
            "tooltip": "Label tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_label.asp"
        });
    }
};

//Image tag
Blockly.Blocks['image'] = {
    init: function() {
        this.jsonInit({
            "message0": '<img src = \"  %1 \"> %2',
            "args0": [
                {
                    "type": "field_input",
                    "name": "source",
                    "text": "http://"
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 330,
            "tooltip": "Image tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_img.asp"
        });
    }
};

//OL tag
Blockly.Blocks['orderedlist'] = {
    init: function() {
        this.jsonInit({
            "message0": '<ol> %1 %2 </ol>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "list"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 20,
            "tooltip": "Ordered list tag",
            "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
        });
    }
};

//UL tag
Blockly.Blocks['unorderedlist'] = {
    init: function() {
        this.jsonInit({
            "message0": '<ul> %1 %2 </ul>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "list"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 20,
            "tooltip": "Unordered list tag",
            "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
        });
    }
};

//LI tag
Blockly.Blocks['listitem'] = {
    init: function() {
        this.jsonInit({
            "message0": '<li> %1 %2 </li>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": "list",
            "nextStatement": "list",
            "colour": 20,
            "tooltip": "List item tag",
            "helpUrl": "https://www.w3schools.com/html/html_lists.asp"
        });
    }
};

//Summary tag
Blockly.Blocks['summary'] = {
    init: function() {
        this.jsonInit({
            "message0": '<summary> %1 %2 </summary>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": "textcontainer"
                }
            ],
            "previousStatement": [
                "summary",
                "textcontainer"
            ],
            "nextStatement": [
                "summary",
                "textcontainer"
            ],
            "colour": 20,
            "tooltip": "Summary tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_summary.asp"
        });
    }
};

//Details tag
Blockly.Blocks['details'] = {
    init: function() {
        this.jsonInit({
            "message0": '<details> %1 %2 </details>',
            "args0": [
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                },
                {
                    "type": "input_statement",
                    "name": "content",
                    "check": [
                        "textcontainer",
                        "summary"
                    ]
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 20,
            "tooltip": "Details tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_details.asp"
        });
    }
};

//Audio tag
Blockly.Blocks['audio'] = {
    init: function() {
        this.jsonInit({
            "message0": '<audio src =  %1 loop = %2 autoplay = %3 controls = %4 > %5',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "source",
                    "options": [
                        [
                            "8bit.ogg",
                            "8bit.ogg"
                        ],
                        [
                            "classical.mp3",
                            "classical.mp3"
                        ],
                        [
                            "happy.wav",
                            "happy.wav"
                        ]
                    ]
                },
                {
                    "type": "field_checkbox",
                    "name": "loop",
                    "checked": false
                },
                {
                    "type": "field_checkbox",
                    "name": "autoplay",
                    "checked": false
                },
                {
                    "type": "field_checkbox",
                    "name": "controls",
                    "checked": true
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 330,
            "tooltip": "Audio tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_audio.asp"
        });
    }
};

//Video tag
Blockly.Blocks['video'] = {
    init: function() {
        this.jsonInit({
            "message0": '<video src =  %1 loop = %2 autoplay = %3 controls = %4 > %5',
            "args0": [
                {
                    "type": "field_dropdown",
                    "name": "source",
                    "options": [
                        [
                            "bigbuckbunny.mp4",
                            "bbb"
                        ],
                        [
                            "llamadrama.mp4",
                            "ld"
                        ]
                    ]
                },
                {
                    "type": "field_checkbox",
                    "name": "loop",
                    "checked": false
                },
                {
                    "type": "field_checkbox",
                    "name": "autoplay",
                    "checked": false
                },
                {
                    "type": "field_checkbox",
                    "name": "controls",
                    "checked": true
                },
                {
                    "type": "input_value",
                    "name": "modifier",
"check": "attributes"
                }
            ],
            "previousStatement": "html",
            "nextStatement": "html",
            "colour": 330,
            "tooltip": "Video tag",
            "helpUrl": "https://www.w3schools.com/tags/tag_video.asp"
        });
    }
};