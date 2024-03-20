export const relevantFlags = ['articleJourneyTestsX']

export function parseFlags(flags) {
	if (!flags || !flags.get) {
		return ''
	}

	const parsedFlags = []

	for (const flag of relevantFlags) {
		let value = flags.get(flag)

		if (value === null || value === undefined || value === '') continue

		if (value === true) {
			value = 'on'
		} else if (value === false || value === 'control') {
			value = 'off'
		}

		parsedFlags.push(`${flag}:${value}`)
	}

	return parsedFlags.join(',')
}
