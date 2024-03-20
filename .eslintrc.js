module.exports = {
	plugins: [
		'react',
	],
	extends: [
		'eslint:recommended',
		'@financial-times/eslint-config-next',
		'@dotcom-reliability-kit/eslint-config',
		'plugin:json/recommended',
		'plugin:yml/standard',
		'plugin:react/recommended',
		'prettier'
	],
	ignorePatterns: ['public/**'],
	rules: {
		"react/prop-types": "off",
	},
};
