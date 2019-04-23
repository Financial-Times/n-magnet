import {hasValidConcepts} from './lib/hasValidConcepts';
import {geDataFromApi} from './lib/magnet-api-client';
import {renderModule} from './lib/magnet-renderer';

export async function magnetInit () {
	const magnetDataSelector = document.querySelector('.js-magnet-data');
	const magnetPlaceholderSelector = document.querySelector('.js-magnet-cta');

	if (!magnetDataSelector || !magnetPlaceholderSelector) {
		throw new Error('DOM not ready for magnet');
	}

	let conceptIds;
	try {
		conceptIds = JSON.parse(magnetDataSelector.innerHTML);
	}
	catch (err) {
		throw new Error(`failed to parse magnetDataSelector, caused by ${err.toString()}`);
	}

	const validConcepts = hasValidConcepts(conceptIds) ? conceptIds : {};

	if (!validConcepts) {
		// eslint-disable-next-line no-console
		console.warn('no valid concepts for article');
	}

	let magnetData;
	try {
		magnetData = await geDataFromApi(validConcepts);
	}
	catch (err) {
		throw new Error(`error on geDataFromApi, caused by ${err.toString()}`);
	}

	try {
		await renderModule(magnetPlaceholderSelector, magnetData);
	}
	catch (err) {
		throw new Error('failedMagnetInit, caused by ' + err.toString());
	}
}
