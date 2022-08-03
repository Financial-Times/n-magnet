import * as config from './config';

const magnetDataSourceUrl = config.get('magnetDataSourceUrl');

export async function geDataFromApi (requestConceptIds = []) {
  const fetchBody = {
    conceptIds: requestConceptIds
  };

  try {
    const fetchResponse = await fetch(magnetDataSourceUrl, {
      body: JSON.stringify(fetchBody),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json'
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
