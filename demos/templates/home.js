function main({ demoUrls }) {
  return `
		<!DOCTYPE html>
		<html lang="en-GB">
		<head>
			<meta charset="utf-8"/>
			<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
			<title>n-magnet demo</title>
			<link rel="stylesheet" href="/magnet-demo/static/styles/demo.css" />
		</head>
		<body>
			<div class="o-grid-container o-grid-container--snappy">
				<h1>n-magnet demo</h1>
				<ul>${Object.entries(demoUrls)
          .map(
            ([name, url]) => `
					<li><a href="${url}">${name}</a></li>
				`
          )
          .join('')}
				</ul>
			</div>
		</body>
	</html>
	`
}

module.exports = main
