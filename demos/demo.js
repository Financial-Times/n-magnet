const { init } = require('../main')
const nTracking = require('@financial-times/n-tracking')

const demoVersion = document.location.search ? document.location.search.trim().split('=')[1] : false // use either 'control' or 'variant' as values

// Set a fake windows.FT.flags object just for local demo
if (!window.FT) {
	window.FT = {
		flags: {
			eventPromoVariantTest: demoVersion,
			oTracking: true,
		},
	}
}

async function main() {
	try {
		const appContext = {
			appName: 'n-magnet',
			product: 'next',
			appVersion: 'demo',
			isProduction: false,
		}

		await init({
			flags: window.FT.flags,
			oTracking: window.FT?.flags?.oTracking ? nTracking.init({ appContext }) : undefined,
		})
	} catch (err) {
		err.message = `failed to initialise magnet, ${err.message}`
		throw err
	}
}

main()
