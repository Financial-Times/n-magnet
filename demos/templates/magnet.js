function main ({title, conceptFixture}) {
	return `
    <!DOCTYPE html>
    <html lang="en-GB">
		<head>
			<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<title>${title}</title>
			<link rel="stylesheet" href="magnet-demo/static/demo.css" />

			<script async defer type="application/javascript" src="magnet-demo/static/demo.js"></script>
		</head>
		<body>
			<div class="o-grid-container">
				<h1>${title}</h1>
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
