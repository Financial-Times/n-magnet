const {magnetInit} = require('../main');

const demoVersion = document.location.search ? document.location.search.trim().split('=')[1] : false; // use either 'control' or 'variant' as values

// Set a fake windows.FT.flags object just for local demo
if (!window.FT) {
	window.FT = {
		flags: {
			eventPromoVariantTest: demoVersion
		}
	};
}

async function init () {
	try {
		await magnetInit(document);
	}
	catch (err) {
		err.message = `failed to initialise magnet, ${err.message}`;
		throw err;
	}
}

init();
