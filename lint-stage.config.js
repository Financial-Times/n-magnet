module.exports = {
	'**/*.{json,md,yml,yaml}': ['prettier --write  --ignore-unknown'],
	'**/*.{ts,tsx,js,jsx,ts,tsx}': ['prettier --write  --ignore-unknown', 'eslint --cache --fix', 'npx jest --bail --findRelatedTests'],
}
