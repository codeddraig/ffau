<?php
require "../php/user/forceAuth.php";
?>
<!doctype html>
<html>
	<head>
		<!--Meta-->
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--Fonts-->
		<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
		<!--Styles-->
		<link rel="stylesheet" media="screen and (min-device-width: 800px)" href="/library/standard.css" />
		<link rel="stylesheet" media="screen and (max-device-width: 800px)" href="/library/mobile.css" />
		<link rel="shortcut icon" type="image/png" href="/library/branding/favicon.png" />
		<!--Libraries-->
		<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.js"></script>
		<script type="text/javascript" src="/library/standard.js"></script>
		<!--Other-->
		<title>CodeDragon : New Project</title>
		<!--Page-specific jQuery-->
		<script>
			function state(){
				var status = GetURLParameter("status");
				switch(status){
					case "1":
						
				}
			}
			function GetURLParameter(sParam){
				var sPageURL = window.location.search.substring(1);
				var sURLVariables = sPageURL.split('&');
				for (var i = 0; i < sURLVariables.length; i++){
					var sParameterName = sURLVariables[i].split('=');
					if (sParameterName[0] == sParam){
						return sParameterName[1];
					}
				}
			}
		</script>
	</head>

	<body onload="state()">
		<nav>
			<a href="/">
				<svg class="nav-brand" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 356.98 167.2"><path d="M947.79,537.39Q945,563.1,929.41,576.73t-41.52,13.64q-18.1,0-32-9t-21.52-25.65q-7.59-16.6-7.71-37.95V496.6q0-21.69,7.6-38.45t21.85-25.87q14.25-9.11,32.81-9.11,26.15,0,41.29,14.08t17.6,39H933.94q-5.15-41.47-45-41.47-22.14,0-35.27,16.56T840.5,497.09V517q0,28.18,12.8,45t34.59,16.77q21.57,0,32.52-10.33t13.53-31Z" transform="translate(-826.64 -423.17)"/><path d="M983,588.13V425.4h45a66.49,66.49,0,0,1,34.2,9,63.06,63.06,0,0,1,24,25.09,76.74,76.74,0,0,1,8.94,36.15v21.13q0,20.34-8.55,36.65a63.24,63.24,0,0,1-23.86,25.49,66.06,66.06,0,0,1-34.2,9.27Zm6-156.69V582.1h39a59.85,59.85,0,0,0,31.13-8.33,58.2,58.2,0,0,0,22-23.25,70.43,70.43,0,0,0,8-33.13v-20.9a70.34,70.34,0,0,0-7.77-33.09,58.3,58.3,0,0,0-21.68-23.3,59.89,59.89,0,0,0-30.79-8.66Z" transform="translate(-826.64 -423.17)"/><path d="M1183,471.67l-7.83-.67q-15.42,0-25.81,10t-13.64,28v79.16h-6V467.2h6v25.15a44.51,44.51,0,0,1,14.75-20q9.84-7.38,24.7-7.38a24.1,24.1,0,0,1,8.5,1.25Z" transform="translate(-826.64 -423.17)"/></svg>
			</a>
			<ul class="nav-items">
				<li class="nav-item"><a href="/">Home</a></li>
				<li class="nav-item"><a href="#">About</a></li>
				<li class="nav-item"><a href="#">Contact</a></li>
				<li class="nav-item"><a href="/php/user/signout.php">Sign out</a></li>
				<li class="nav-item important"><a href="/user/home">Dashboard</a></li>
			</ul>
		</nav>
		<div class="container">
			<div class="row">
				<div class="col7">
					<h1 class="header no-mar">New project</h1>
				</div>
				<div class="col3 top">
					<button class="btn right" data-link="/user/home">Dashboard</button>
				</div>
			</div>
			<hr class="separator">
			<div class="box">
				<form action="/php/project/create.php" method="post">
					<h1 class="sub-header">Choose a title for your project</h1>
					<input type="text" name="title" placeholder="Title">
					<h1 class="sub-header">Add a description</h1>
					<textarea name="description" placeholder="Description"></textarea>
					<h1 class="sub-header">Choose a privacy option</h1>
					<div class="radio-group">
						<input type="radio" name="privacy" value="1" id="radio1">
						<label class="radio-label" for="radio1">Public</label><br/>
					</div>
					<div class="radio-group">
						<input type="radio" name="privacy" value="2" id="radio2">
						<label class="radio-label" for="radio2">Unlisted</label><br/>
					</div>
					<div class="radio-group">
						<input type="radio" name="privacy" value="3" id="radio3">
						<label class="radio-label" for="radio3">Private</label><br/>
					</div><br/>
					<input type="submit" value="Go!">
				</form>
			</div>
		</div>
	</body>
</html>