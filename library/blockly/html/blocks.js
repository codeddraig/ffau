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

//header tag
Blockly.Blocks['headertag'] = {
	init: function() {
		this.jsonInit({
			"message0": '<header> %1 %2 </header>',
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
			"output": null,
			"colour": 290,
			"tooltip": "Inline CSS",
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

//Font-size
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

//BGColor
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

//Width height number selector
Blockly.Blocks['widthheightnum'] = {
	init: function(){
		this.jsonInit({
			"message0": '%1 : %2 %3 ;',
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
					"type": "field_number",
					"name": "size",
					"value": 10,
					"min": 0
				},
				{
					"type": "field_dropdown",
					"name": "unit",
					"options": [
						[
							"%",
							"%"
						],
						[
							"px",
							"px"
						],
						[
							"cm",
							"cm"
						],
						[
							"em",
							"em"
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

//Other tag
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

//Table tag
Blockly.Blocks['table'] = {
	init: function() {
		this.jsonInit({
			"message0": '<table> %1 %2 </table>',
			"args0": [
				{
					"type": "input_value",
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
				},
				{
					"type": "input_statement",
					"name": "content",
					"check": "textcontainer"
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
					"name": "modifier"
				},
				{
					"type": "input_statement",
					"name": "content",
					"check": "textcontainer"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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
					"name": "modifier"
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