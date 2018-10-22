function hasValidConcept (concepts) {
	const validKeys = ['focus', 'speakers'];
	const conceptIds = concepts.conceptIds;

	if (conceptIds) {
		for (const key of validKeys) {
			if ((key in conceptIds) && Array.isArray(conceptIds[key]) && conceptIds[key].length > 0) {
				return true;
			}
		}
	}

	return false;
};

module.exports = {
    hasValidConcept
};