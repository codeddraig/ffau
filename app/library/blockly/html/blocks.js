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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
			"message0": 'arguments: %1 %2',
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
			"output": null,
			"colour": 120,
			"tooltip": "Additional arguments",
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"tooltip": "Class modifier",
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
			"tooltip": "ID modifier",
			"helpUrl": "https://www.w3schools.com/tags/att_global_id.asp"
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
					"type": "input_dummy"
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
			"helpUrl": "https://www.w3schools.com/css/default.asp"
		});
	}
};

//Font-family
Blockly.Blocks['fontfamily'] = {
	init: function() {
		this.jsonInit({
			"message0": 'font-family: %1',
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
			"message0": 'font-size: %1',
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

//Font-size
Blockly.Blocks['margin'] = {
	init: function() {
		this.jsonInit({
			"message0": 'margin - %1 : %2',
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

//Other tag
Blockly.Blocks['othercss'] = {
	init: function() {
		this.jsonInit({
			"message0": '%1 : %2',
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

//p tag
Blockly.Blocks['paragraph'] = {
	init: function() {
		this.jsonInit({
			"message0": '<p> %1 %2 </p>',
			"args0": [
				{
					"type": "input_value",
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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