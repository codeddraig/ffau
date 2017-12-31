"use strict";

var htmlGen = new Blockly.Generator('HTML');

htmlGen.init = function(workspace) {};
htmlGen.finish = function(code) {return code;};

htmlGen.scrub_ = function(block, code) {
	var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
	var nextCode = htmlGen.blockToCode(nextBlock);
	return code + nextCode;
};

htmlGen['html'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var code = '<html>\n' + statements_content + '</html>\n';
	return code;
};

htmlGen['head'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var code = '<head>\n' + statements_content + '</head>\n';
	return code;
};

htmlGen['metacharset'] = function(block) {
	var value = block.getFieldValue('value');
	var code = '<meta charset="'+value+'">\n';
	return code;
};

htmlGen['title'] = function(block) {
	var value = block.getFieldValue('value');
	var code = '<title>'+value+'</title>\n';
	return code;
};

htmlGen['body'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<body'+block_modifier+'>\n' + statements_content + '</body>\n';
	return code;
};

htmlGen['headertag'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<header'+block_modifier+'>\n' + statements_content + '</header>\n';
	return code;
};

htmlGen['footertag'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<footer'+block_modifier+'>\n' + statements_content + '</footer>\n';
	return code;
};

htmlGen['divider'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<div'+block_modifier+'>\n' + statements_content + '</div>\n';
	return code;
};

htmlGen['linebreak'] = function(block){
	return "<br/>\n";
}

htmlGen['hline'] = function(block){
	var modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	return "<hr"+modifier+"/>\n";
}

htmlGen['style'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var code = '<style>\n'+stmt+'</style>\n'
	return code;
};

htmlGen['stylearg'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var code = 'style="'+stmt+'"';
	return code;
};

htmlGen['cssitem'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var selector = block.getFieldValue('selector');
	var code = selector+'{\n'+stmt+'}\n';
	return code;
};

htmlGen['fontfamily'] = function(block){
	var value = block.getFieldValue('value');
	var code = 'font-family: '+value+';\n';
	return code;
};

htmlGen['fontsize'] = function(block){
	var value = block.getFieldValue('value');
	var code = 'font-size: '+value+';\n';
	return code;
};

htmlGen['margin'] = function(block){
	var direction = block.getFieldValue('direction');
	var value = block.getFieldValue('value');
	var code = 'margin-'+direction+': '+value+';\n';
	return code;
};

htmlGen['color'] = function(block){
	var color = block.getFieldValue('value');
	var code = 'color: '+color+';\n';
	return code;
};

htmlGen['bgcolor'] = function(block){
	var color = block.getFieldValue('value');
	var code = 'background-color: '+color+';\n';
	return code;
};

htmlGen['border'] = function(block){
	var width = block.getFieldValue('width');
	var type = block.getFieldValue('type');
	var color = block.getFieldValue('color');
	var code = 'border: '+width+'px '+type+' '+color+';\n';
	return code;
};

htmlGen['bordercol'] = function(block){
	var collapse = block.getFieldValue('value');
	var code;
	if(collapse==="TRUE"){
		code = 'border-collapse: collapse;\n';
	}else{
		code = 'border-collapse: separate;\n';
	}
	return code;
}

htmlGen['widthheightnum'] = function(block){
	var option = block.getFieldValue('option');
	var size = block.getFieldValue('size');
	var unit = block.getFieldValue('unit');
	var code = option+': '+size+unit+';\n';
	return code;
};

htmlGen['widthheight'] = function(block){
	var option = block.getFieldValue('option');
	var value = block.getFieldValue('value');
	var code = option+': '+value+';\n';
	return code;
};

htmlGen['othercss'] = function(block){
	var property = block.getFieldValue('property');
	var value = block.getFieldValue('value');
	var code = property+': '+value+';\n';
	return code;
};

htmlGen['args'] = function(block) {
	var content = htmlGen.statementToCode(block, 'content');
	return content;
};

htmlGen['class'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = 'class="'+text_content+'" ';
	return code;
};

htmlGen['id'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = 'id="'+text_content+'" ';
	return code;
};

htmlGen['emptyarg'] = function(block) {
	var property = block.getFieldValue('property');
	var value = block.getFieldValue('value');
	var code = property+'="'+value+'" ';
	return code;
};

htmlGen['emptytext'] = function(block) {
	var text_content = block.getFieldValue('content');
	var code = text_content+' ';
	return code;
};

htmlGen['paragraph'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<p'+block_modifier+'>'+statements_content+'</p>\n';
	return code;
};

htmlGen['header'] = function(block) {
	var statements_content = htmlGen.statementToCode(block, 'content');
	var header_size = block.getFieldValue("size");
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<h'+header_size+block_modifier+'>\n' + statements_content + '</h'+header_size+'>\n';
	return code;
};

htmlGen['textmod'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var type = block.getFieldValue("type");
	var code = '<'+type+'>'+content+'</'+type+'>';
	return code;
};

htmlGen['span'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<span'+mod+'>'+content+'</span>';
	return code;
};

htmlGen['link'] = function(block){
	var text = htmlGen.statementToCode(block, 'content');
	var link = block.getFieldValue('target');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<a href="'+link+'" '+block_modifier+'>'+text+'</a>\n';
	return code;
};

htmlGen['table'] = function(block){
	var content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<table'+block_modifier+'>\n'+content+'</table>\n';
	return code;
};

htmlGen['tablerow'] = function(block){
	var content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<tr'+block_modifier+'>\n'+content+'</tr>\n';
	return code;
};

htmlGen['tableheading'] = function(block){
	var content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<th'+block_modifier+'>\n'+content+'</th>\n';
	return code;
};

htmlGen['tabledata'] = function(block){
	var content = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<td'+block_modifier+'>\n'+content+'</td>\n';
	return code;
};

htmlGen['form'] = function(block){
	var stmt = htmlGen.statementToCode(block, 'content');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<form'+block_modifier+'>\n'+stmt+'</form>\n';
	return code;
};

htmlGen['input'] = function(block){
	var type = block.getFieldValue('type');
	var value = block.getFieldValue('value');
	var placeholder = block.getFieldValue('placeholder');
	var name = block.getFieldValue('name');
	var block_modifier = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<input type="'+type+'" value="'+value+'" placeholder="'+placeholder+'" name="'+name+'"'+block_modifier+'>\n';
	return code;
};

htmlGen['image'] = function(block){
	var source = block.getFieldValue('source');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<img src="'+source+'"'+mod+'>\n';
	return code;
};

htmlGen['orderedlist'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<ol'+mod+'>\n'+content+'</ol>\n';
	return code;
};

htmlGen['unorderedlist'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<ul'+mod+'>\n'+content+'</ul>\n';
	return code;
};

htmlGen['listitem'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<li'+mod+'>'+content+'</li>\n';
	return code;
};

htmlGen['details'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<details'+mod+'>\n'+content+'</details>\n';
	return code;
};

htmlGen['summary'] = function(block){
	var content = htmlGen.statementToCode(block,'content');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<summary'+mod+'>'+content+'</summary>\n';
	return code;
};

htmlGen['audio'] = function(block){
	var source = block.getFieldValue('source');
	var loop = block.getFieldValue('loop');
	var autoplay = block.getFieldValue('autoplay');
	var controls = block.getFieldValue('controls');
	var mod = htmlGen.statementToCode(block, 'modifier', htmlGen.ORDER_ATOMIC);
	var code = '<audio'+mod;
	if(loop==="TRUE"){
		code+=' loop';
	}
	if(autoplay==="TRUE"){
		code+=' autoplay';
	}
	if(controls==="TRUE"){
		code+=' controls';
	}
	var type;
	switch(source){
		case "8bit.ogg":
			type = "audio/ogg";
			break;
		case "classical.mp3":
			type = "audio/mpeg";
			break;
		case "happy.wav":
			type = "audio/wav";
			break;
	}
	code+='>\n<source src="http://cdbeta.hma-uk.org/library/media/'+source+'" type="'+type+'">\n</audio>\n';
	return code;
};