const { PageKitBasePlugin } = require('@financial-times/dotcom-build-base')
const { PageKitJsPlugin } = require('@financial-times/dotcom-build-js')
const { PageKitSassPlugin } = require('@financial-times/dotcom-build-sass')
const xEngine = require('@financial-times/x-engine/src/webpack')

module.exports = {
	entry: {
		scripts: ['./demos/demo.js'],
		styles: ['./demos/demo.scss'],
	},
	plugins: [
		new PageKitBasePlugin(),
		new PageKitJsPlugin({
			jsxPragma: 'React.createElement',
			jsxPragmaFrag: 'React.Fragment',
		}),
		new PageKitSassPlugin({ prependData: "$o-grid-mode: 'snappy';" }),
		xEngine(),
	],
	resolve: {
		alias: {
			react: 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
			'react-dom': 'preact/compat',
		},
	},
}
