(function(){
  "use strict";
}());
var editor = ace.edit("code-output");
editor.setTheme("ace/theme/textmate");
editor.session.setMode("ace/mode/html");
editor.setReadOnly(true);
var workspace = Blockly.inject('blocklyDiv',
										   {toolbox: document.getElementById('toolbox'),
											zoom:
											{controls:true,
											 wheel:true,
											 startScale: 1.0,
											 maxScale: 3,
											 minScale: 0.3,
											 scaleSpeed:1.2},
											trashcan: true});
// [above] inject the blockly workspace into the div
function onUpdate(event){
  var code = htmlGen.workspaceToCode(workspace);
  var iframe = document.getElementById('preview-frame');
  editor.setValue(code);
  iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
} // function to update HTML
workspace.addChangeListener(onUpdate);
function saveCode(){
  var xml = Blockly.Xml.workspaceToDom(workspace);
  var xml_text = Blockly.Xml.domToText(xml);
  download('ffau_export.txt',xml_text);
}
function clearCode(){
  if(confirm("Are you sure you want to reset the Ffau workspace?")){
    Blockly.mainWorkspace.clear();
		showMePreview();
  }
}
function loadCode(){
  $('.load').show();
  $('#loadi').hide();
}
function doLoad(){
  var fileToLoad = document.getElementById('loadText').files[0];
  var fileReader = new FileReader();
  fileReader.onload = function(fileLoadedEvent){
    var textFromFileLoaded = fileLoadedEvent.target.result;
    var xml = Blockly.Xml.textToDom(textFromFileLoaded);
    Blockly.Xml.domToWorkspace(xml, workspace);
    $('.load').hide();
    $('#loadi').show();
  };
  fileReader.readAsText(fileToLoad, "UTF-8");
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
function showMePreview(){
  document.getElementById("preview-frame").style.display = 'block';
  document.getElementById("code-output").style.display = 'none';
}
function showMeCode(){
  document.getElementById("preview-frame").style.display = 'none';
  document.getElementById("code-output").style.display = 'block';
}
$('#version-loader').load('version.txt');
$(document).ready(function(){
  $('.load').hide();
  showMePreview();
});
