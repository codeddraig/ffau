$(document).ready(function(){
	$('.btn, .project').click(function(){
		var link = this.getAttribute("data-link");
		window.location.replace(link);
	});
});