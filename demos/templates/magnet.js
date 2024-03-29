function main({ title, magnetData, assetLoader }) {
	return `
		<!DOCTYPE html>
		<html lang="en-GB">
		<head>
			<meta charset="utf-8"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<title>${title}</title>
			
			<script>
				var exports = {};
			</script>
			<!--<script async defer type="application/javascript" src="/magnet-demo/static/styles/demo.js"></script>
			<script async defer type="application/javascript" src="/magnet-demo/static/demo.js"></script>-->
			${assetLoader.getStylesheetURLsFor('styles').map((url) => `<link rel="stylesheet" href="${url}" />`)}
			${assetLoader.getScriptURLsFor('scripts').map((url) => `<script async defer src=${url}></script>`)}
		</head>
		<body>
			<div class="o-grid-container o-grid-container--snappy">
				<h1>${title}</h1>
				<a href='../'> Back</a>
				<div class="magnet-filler">
					This is a filler needed to see the IntersectionObserver in action. <br>
					Scroll down to see the eventpromo below.<br>
					The "save view" call should only kick in when the eventpromo is in view <br>
					<br>
					vvvvv
				</div>
				<div class="o-grid-row demo-context__inarticle" data-o-grid-colspan="12">
					<script class="js-magnet-data" type="application/json">${JSON.stringify(magnetData)}</script>
					<div class="magnet-cta js-magnet-cta" data-trackable="magnet-cta"></div>
				</div>
				<div class="magnet-filler">
					^^^^^
					<br>
					This is a filler needed to see the IntersectionObserver in action. <br>
					Scroll up to see the eventpromo above.<br>
					The "save view" call should only kick in when the eventpromo is in view <br>
					<br>
				</div>
			</div>
		</body>
	</html>
	`
}

module.exports = main
