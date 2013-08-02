<!DOCTYPE HTML>

<html lang="de">
<head>
	<meta charset="utf-8">
	<title>grunt-template</title>
	
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width">
	<meta http-equiv="imagetoolbar" content="no">
	
	<!-- @if NODE_ENV='development' -->
	<link rel="stylesheet" href="<%= sass_path %>style.css" type="text/css">
	
	<script src="<%= js_path %>libs/jquery-1.10.2.js"></script>
	<script src="<%= js_path %>libs/underscore.js"></script>
	<script src="<%= js_path %>libs/handlebars.js"></script>
	<script src="<%= js_path %>data/someData.json"></script>
	<script src="<%= coffee_path %>script.js"></script>
	<!-- @endif -->
	
	<!-- @if NODE_ENV='production' -->
	<link rel="stylesheet" href="style.<!-- @echo VERSION -->.css" type="text/css">
	<script src="script.<!-- @echo VERSION -->.js"></script>
	<!-- @endif -->
</head>
<body>
	
	<script id="sample-template" type="text/x-handlebars-template">
		<p>
			This is a JavaScript handlebars template and there are {{someNumber}} items in the test data.
		</p>
	</script>
	
	<p>
		Hi there!
	</p>
	
	<img src="<%= asset_path %>sample_image.jpg">
	
</body>
</html>
