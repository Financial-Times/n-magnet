function main({ demoUrls, assetLoader }) {
	return `<!DOCTYPE html>
	<html lang="en-GB">
		<head>
			<meta charset="utf-8"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<meta name="viewport" content="width=device-width, initial-scale=1"/>
			<title>n-magnet demo</title>
			${assetLoader.getStylesheetURLsFor('styles').map((url) => `<link rel="stylesheet" href="${url}" />`)}
			${assetLoader.getScriptURLsFor('scripts').map((url) => `<script src=${url}></script>`)}
		</head>
		<body>
			<div class="o-grid-container o-grid-container--snappy">
				<h1>n-magnet demo</h1>
				<ul>${Object.entries(demoUrls)
					.map(([name, url]) => `<li><a href="${url}">${name}</a></li>`)
					.join('')}
				</ul>
			</div>
		</body>
	</html>`
}

module.exports = main
