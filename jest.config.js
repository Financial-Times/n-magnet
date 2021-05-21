module.exports = {
    coveragePathIgnorePatterns: [
        '/node_modules/'
    ],
    testPathIgnorePatterns: [
        '/node_modules/',
        '/bower_components/'
    ],
    testURL: 'http://localhost/',
    transform: {
        '.(js|jsx)': '@sucrase/jest-plugin',
    },
    moduleDirectories: ['node_modules', 'bower_components'],
    resolver: '@financial-times/jest-bower-resolver',
};
