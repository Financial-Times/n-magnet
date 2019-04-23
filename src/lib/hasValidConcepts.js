export function hasValidConcepts (conceptIds = {}) {
	const validKeys = ['focus', 'speakers'];

	if (typeof conceptIds === 'object' && conceptIds) {
		for (const key of validKeys) {
			if ((key in conceptIds) && Array.isArray(conceptIds[key]) && conceptIds[key].length > 0) {
				return true;
			}
		}
	}

	return false;
}
