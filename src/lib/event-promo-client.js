const config = require('../lib/config');

const eventpromoDataSourceUrl = process.env.EVENTPROMO_DATASOURCE_URL || config.get('eventpromoDataSourceUrl');

async function getEventsFromApi (conceptIds = []) {
	let fetchResponse;
	try {
		fetchResponse = await fetch(eventpromoDataSourceUrl, {
			body: JSON.stringify(conceptIds),
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			},
			method: 'POST'
		});
	}
	catch (err) {
		throw new Error('failed to fetch eventpromos from api');
	}

	try {
		const jsonResponse = await fetchResponse.json();
		return jsonResponse;
	}
	catch (err) {
		throw new Error('failed to parse response from eventpromos api');
	}
}

module.exports = {
	getEventsFromApi
};
