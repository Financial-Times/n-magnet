import * as config from './config';
import { parseFlags } from './parseFlags';

const magnetDataSourceUrl = config.get('magnetDataSourceUrl');

export async function getDataFromApi (requestConceptIds = [], flags = {}) {
  const fetchBody = {
    conceptIds: requestConceptIds
  };

  try {
    const fetchResponse = await fetch(magnetDataSourceUrl, {
      body: JSON.stringify(fetchBody),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'ft-flags': parseFlags(flags)
      },
      method: 'POST'
    });
    if (!fetchResponse.ok) {
      const error = new Error(fetchResponse.status === 404 ? 'notFound' : 'failedToGetData');
      throw error;
    }
    return await fetchResponse.json();
  } catch (err) {
    err.message = `failed to get magnet data from api, cause: ${err.message}`;
    throw err;
  }
}
