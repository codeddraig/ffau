/*
        Ffau - A blocky-based editor for teaching HTML, CSS and Javascript.

				Developed by Pal Kerecsenyi, Geza Kerecsenyi and Theodore Tucker.
				Full details are avaliable at the Github repo: https://github.com/codeddraig/ffau
				Ffau editor will not work without its libraries. The best way to get all
					off this data at once is to grab the latest release version from the
					Github repo.
				Ffau is open source software. This means you can re-mix, share and use
					it however you want, including for commercial purposes. However, you
					MUST provide attribution to the original authors if you do this.
				However, Ffau is provided with NO WARRANTY whatsoever, and by using this
					software, you agree to the terms of the MIT License.

				Copyright (c) 2017-18 Pal Kerecsenyi, Geza Kerecsenyi and tti0 (https://github.com/tti0)

				THIS IS VERSION 0.3.1
*/
(function(){
  "use strict";
  Blockly.HSV_SATURATION = 1;
  Blockly.HSV_VALUE = 0.7;
}());
class Ffau{
  renderBlockly(frame,toolbox){
    var frameID = "ffauframe-"+Math.floor(Math.random()*10000);
    frame.id = frameID;
    this.ffauWorkspace = Blockly.inject(frameID,{toolbox: toolbox,zoom:{controls:true,wheel:true,startScale: 1.0,maxScale: 3,minScale: 0.3,scaleSpeed:1.2},trashcan: true});
    return frameID;
  }
  renderPreview(frame){
    var frameID = "ffaupreview-"+Math.floor(Math.random()*10000);
    frame.innerHTML = '<iframe style="height:inherit;width:inherit;" id="'+frameID+'"></iframe>';
    this.iframe = document.getElementById(frameID);
    return this.iframe;
  }
  renderCode(frame){
    var editor = ace.edit(frame.id);
    editor.setTheme("ace/theme/textmate");
    editor.session.setMode("ace/mode/html");
    editor.setReadOnly(true);
    editor.setValue("");
    this.code = editor;
    return this.code;
  }
  addEvent(){
    var workspace = this.ffauWorkspace;
    var editor = this.code;
    var iframe = this.iframe;
    this.ffauWorkspace.addChangeListener(function(){
      var code = htmlGen.workspaceToCode(workspace);
      editor.setValue(code);
      iframe.src = "data:text/html;charset=utf-8," + encodeURIComponent(code);
    });
  }
}