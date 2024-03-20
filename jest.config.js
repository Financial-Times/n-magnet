module.exports = {
	coveragePathIgnorePatterns: ['/node_modules/'],
	testPathIgnorePatterns: ['/node_modules/'],
	moduleDirectories: ['node_modules'],
	testURL: 'http://localhost/',
	setupFiles: ['<rootDir>/.jest/setEnvVars.js'],
}
