module.exports = {
	files: {
		allow: [],
		allowOverrides: []
	},
	strings: {
		deny: [],
		denyOverrides: [
			'19b95057-4614-45fb-9306-4d54049354db', // demos/conceptFixtures.json:4, demos/fixtures.json:7, tests/fixtures/conceptFixture.json:4
			'1d556016-ad16-4fe7-8724-42b3fb15ad28', // demos/conceptFixtures.json:7, tests/fixtures/conceptFixture.json:7
			'd90b783d-8eb9-30bb-b078-c0cef19bacb0', // demos/fixtures.json:11
			'f17e63fd1eda51789dc5e6bdd8e3dfae', // demos/fixtures.json:18|18
			'11259aab-28bd-cf0b-29c5-d6cde7eeac80' // demos/fixtures.json:29
		]
	}
};
