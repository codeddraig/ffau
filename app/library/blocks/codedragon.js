"use strict";
//Drag
interact('.item').draggable({
    inertia: false,
    autoScroll: true,
    onmove: dragMoveListener,
});
function dragMoveListener (event) {
	var target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	target.style.webkitTransform =
	target.style.transform =
		'translate(' + x + 'px, ' + y + 'px)';
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
	}
window.dragMoveListener = dragMoveListener;
//Collision
function collision($div1, $div2) {
	var x1 = $div1.offset().left;
	var y1 = $div1.offset().top;
	var h1 = $div1.outerHeight(true);
	var w1 = $div1.outerWidth(true);
	var b1 = y1 + h1;
	var r1 = x1 + w1;
	var x2 = $div2.offset().left;
	var y2 = $div2.offset().top;
	var h2 = $div2.outerHeight(true);
	var w2 = $div2.outerWidth(true);
	var b2 = y2 + h2;
	var r2 = x2 + w2;
	if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
	return true;
}
function bin(){
	console.log("Running bin");
	if(collision($('.item'), $('.bin'))===true){
		console.log("Trigger");
		$('.item').hide();
	}
}
window.setInterval(bin(), 200);