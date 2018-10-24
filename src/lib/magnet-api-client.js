import {hasValidConcepts} from './hasValidConcepts';
import * as config from './config';

export async function geDataFromApi (conceptIds = []) {
    try {
        const requestConceptIds = {};
        if (hasValidConcepts(conceptIds)) {
            requestConceptIds.conceptIds = {
                focus: conceptIds.focus || [],
                speakers: conceptIds.speakers || [],
            };
        }

        const fetchResponse = await fetch(config.get('magnetDataSourceUrl'), {
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