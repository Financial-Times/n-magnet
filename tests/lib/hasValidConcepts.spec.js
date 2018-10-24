const {hasValidConcepts} = require('../../src/lib/hasValidConcepts');
const validConcepts = require('../fixtures/conceptFixture');

describe('hasValidConcepts()', () => {

	test('given a concept object with valid concept values returns true', () => {
		expect(hasValidConcepts(validConcepts)).toBe(true);
	});

	test('given a concept object with invalid concept values returns false', () => {
	    const invalidConceptObject = 'invalid';
		expect(hasValidConcepts(invalidConceptObject)).toBe(false);
	});

	test('given a concept object with invalid concept values returns false', () => {
		const emptyConceptObject = {};
		expect(hasValidConcepts(emptyConceptObject)).toBe(false);
	});

});
