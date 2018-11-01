import * as config from './config';

const magnetDataSourceUrl = process.env.MAGNET_DATASOURCE_URL || config.get('magnetDataSourceUrl');

export async function geDataFromApi (conceptIds = []) {
    const requestConceptIds = {};
    if (conceptIds) {
        requestConceptIds.conceptIds = {
            focus: conceptIds.focus || [],
            speakers: conceptIds.speakers || [],
        };
    }

    try {
        const fetchResponse = await fetch(magnetDataSourceUrl, {
            body: JSON.stringify(requestConceptIds),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        return await fetchResponse.json();
    }
    catch (err) {
        throw new Error(`failed to get magnet data from api, cause: ${err.toString()}`);
    }
}