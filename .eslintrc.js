const config = {
	'parser': 'babel-eslint',
	'env': {
		'browser': true,
		'es6': true,
		'mocha': true,
		'node': true
	},
	'parserOptions': {
		'ecmaVersion': 2018,
		'sourceType': 'module',
		'ecmaFeatures': {
			'jsx': true,
			'modules': true
		}
	},
	'rules': {
		'eqeqeq': 2,
		'guard-for-in': 2,
		'new-cap': 0,
		'no-caller': 2,
		'no-console': 2,
		'no-extend-native': 2,
		'no-irregular-whitespace': 2,
		'no-loop-func': 2,
		'no-multi-spaces': 2,
		'no-undef': 2,
		'no-underscore-dangle': 0,
		'no-unused-vars': 2,
		'no-var': 2,
		'one-var': [2, 'never'],
		'quotes': [2, 'single'],
		'semi': [1, 'always'],
		'space-before-function-paren': [2, 'always'],
		'wrap-iife': 2
	},
	'globals': {
		'cy': true,
		'cypress': true,
		'Cypress': true,
		'fetch': true,
		'requireText': true
	},
	'plugins': [
		'no-only-tests'
	],
	'extends': [],
	'overrides': [
		{
			'files': ['test/**/*.js', 'tests/**/*.js'],
			'rules': {
				'no-only-tests/no-only-tests': 2
			}
		}
	],
	'settings': {
		'react': {
			'version': 'detect'
		}
	}
};

const packageJson = require('./package.json');

const packageJsonContainsPackage = packageName => {
	const {dependencies, devDependencies} = packageJson;
	return (
		(dependencies && dependencies[packageName])
		|| (devDependencies && devDependencies[packageName])
	);
};

if ((packageJsonContainsPackage('react') || packageJsonContainsPackage('preact'))) {
	config.plugins.push('react');
	config.extends.push('plugin:react/recommended');

	Object.assign(config.rules, {
		'react/display-name': 0,
		'react/prop-types': 0,
		'react/no-danger': 0,
		'react/no-render-return-value': 0
	});
}

if (packageJsonContainsPackage('jest')) {
	config.env.jest = true;
}

if (packageJson && packageJson.eslintConfig) {
	Object.assign(config.env, packageJson.eslintConfig.env);
	Object.assign(config.parserOptions, packageJson.eslintConfig.parserOptions);
	Object.assign(config.rules, packageJson.eslintConfig.rules);
	Object.assign(config.globals, packageJson.eslintConfig.globals);
}

module.exports = config;
