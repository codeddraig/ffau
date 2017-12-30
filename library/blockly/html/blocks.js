//HTML tag
Blockly.Blocks['html'] = {
	init: function() {
		this.jsonInit({
			"message0": '<html> %1 %2',
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
			"colour": 230,
			"tooltip": "HTML tag",
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};

//Head tag
Blockly.Blocks['head'] = {
	init: function() {
		this.jsonInit({
			"message0": '<head> %1 %2',
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
			"colour": 230,
			"tooltip": "Head tag",
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};

//Body tag
Blockly.Blocks['body'] = {
	init: function() {
		this.jsonInit({
			"message0": '<body> %1 %2',
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
			"colour": 230,
			"tooltip": "Body tag",
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};

//Title tag
Blockly.Blocks['title'] = {
	init: function() {
		this.jsonInit({
			"message0": '<title> %1',
			"args0": [
				{
					"type": "input_statement",
					"name": "content",
					"check": "textcontainer"
				}
			],
			"previousStatement": "header",
			"nextStatement": "header",
			"colour": 230,
			"tooltip": "Title tag",
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};

//p tag
Blockly.Blocks['paragraph'] = {
	init: function() {
		this.jsonInit({
			"message0": '<p> %1 %2',
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};

//header tag
Blockly.Blocks['header'] = {
	init: function() {
		this.jsonInit({
			"message0": '<h %1 > %2 %3',
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
			"helpUrl": "http://www.w3schools.com/tags/tag_html.asp"
		});
	}
};