function main ({title, conceptFixture}) {
	return `
		<!DOCTYPE html>
		<html lang="en-GB">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>${title}</title>
			<link rel="stylesheet" href="magnet-demo/static/styles/demo.css" />

			<script>
				var exports = {};
			</script>
			<script async defer type="application/javascript" src="magnet-demo/static/styles/demo.js"></script>
			<script async defer type="application/javascript" src="magnet-demo/static/demo.js"></script>
		</head>
		<body>
			<div class="o-grid-container">
				<h1>${title}</h1>
				<div class="magnet-filler">
					This is a filler needed to see the IntersectionObserver in action. <br>
					Scroll down to see the eventpromo below.<br>
					The "save view" call should only kick in when the eventpromo is in view <br>
					<br>
					vvvvv
				</div>
				<div class="o-grid-row demo-context__inarticle" data-o-grid-colspan="12">
					<script class="js-magnet-data" type="application/json">${conceptFixture}</script>
					<div class="magnet-cta js-magnet-cta"></div>
				</div>
			</div>
		</body>
	</html>
	`;
}

module.exports = main;
