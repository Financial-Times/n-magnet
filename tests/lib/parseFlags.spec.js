import { parseFlags, relevantFlags } from '../../src/lib/parseFlags'

const createStubbedFlags = (values) => {
	return {
		get: (key) => {
			return values[key]
		},
	}
}

describe('parseFlags()', () => {
	test('given an empty object of flags, it should return an empty string', () => {
		expect(parseFlags({})).toBe('')
	})
	test('given null / undefined object of flags, it should return an empty string', () => {
		expect(parseFlags(undefined)).toBe('')
		expect(parseFlags(null)).toBe('')
	})
	test('given an object of flags that contains no relevant flags, it should return an empty string', () => {
		const nonReleventFlags = createStubbedFlags({
			'non-relevant-flag': 'value1',
		})
		expect(parseFlags(nonReleventFlags)).toBe('')
	})
	test('given an object of flags that contains a relevant flag, it should return key:value formatted string', () => {
		const onlyRelevantFlags = createStubbedFlags({
			[relevantFlags[0]]: 'value1',
		})
		expect(parseFlags(onlyRelevantFlags)).toBe(`${relevantFlags[0]}:value1`)
	})
	test('given an object of flags that contains a relevant flag that is toggler and the value is true, it should return a key:on formatted string', () => {
		const onlyRelevantFlags = createStubbedFlags({ [relevantFlags[0]]: true })
		expect(parseFlags(onlyRelevantFlags)).toBe(`${relevantFlags[0]}:on`)
	})
	test('given an object of flags that contains a relevant flag that is toggler and the value is false, it should return a key:off formatted string', () => {
		const onlyRelevantFlags = createStubbedFlags({ [relevantFlags[0]]: false })
		expect(parseFlags(onlyRelevantFlags)).toBe(`${relevantFlags[0]}:off`)
	})
	test('given an object of flags that contains a relevant flag that is toggler and the value is control, it should return a key:off formatted string', () => {
		const onlyRelevantFlags = createStubbedFlags({
			[relevantFlags[0]]: 'control',
		})
		expect(parseFlags(onlyRelevantFlags)).toBe(`${relevantFlags[0]}:off`)
	})
	test('given an object of flags that contains a relevant flag, but the value is false or undefined or null, it should return an empty string', () => {
		const onlyRelevantFlagsButNullValue = createStubbedFlags({
			[relevantFlags[0]]: null,
		})
		expect(parseFlags(onlyRelevantFlagsButNullValue)).toBe('')

		const onlyRelevantFlagsButUndefinedValue = createStubbedFlags({
			[relevantFlags[0]]: undefined,
		})
		expect(parseFlags(onlyRelevantFlagsButUndefinedValue)).toBe('')

		const onlyRelevantFlagsButEmptyStringValue = createStubbedFlags({
			[relevantFlags[0]]: '',
		})
		expect(parseFlags(onlyRelevantFlagsButEmptyStringValue)).toBe('')
	})
	test('given an object of flags that contains a mix of relevant and unrelevant ones, it should return key:value formatted string containing only the relevant tuple', () => {
		const mixedRelevantAndNonRelevantFlags = createStubbedFlags({
			[relevantFlags[0]]: 'value1',
			'non-relevant-flag': 'value2',
		})
		expect(parseFlags(mixedRelevantAndNonRelevantFlags)).toBe(`${relevantFlags[0]}:value1`)
	})
})
