module.exports = {
	testEnvironment: 'node',
	restoreMocks: true,
	testPathIgnorePatterns: ['client'],
	coveragePathIgnorePatterns: ['node_modules', 'src/config', 'src/app.js', 'tests', 'client'],
	coverageReporters: ['text', 'lcov', 'clover', 'html'],
};
