import {geDataFromApi} from './lib/magnet-api-client';
import {renderModule} from './lib/magnet-renderer';

export async function magnetInit () {
    const magnetDataSelector = document.querySelector('.js-magnet-data');
    const magnetPlaceholderSelector = document.querySelector('.js-magnet-cta');

    if (!magnetDataSelector || !magnetPlaceholderSelector) {
        throw new Error('DOM not ready for magnet');
    }

    const conceptIds = JSON.parse(magnetDataSelector.innerHTML);
    if (!conceptIds) {
        // eslint-disable-next-line no-console
        console.warn('no valid concepts for article');
    }

    let magnetData;
    try {
        magnetData = await geDataFromApi(conceptIds);
    }
    catch (err) {
        throw new Error(`error on geDataFromApi, caused by ${err.toString()}`);
    }

    try {
        await renderModule(magnetPlaceholderSelector, magnetData);

        const replacedItem = document.querySelector('.js-instant-alert-cta');
        replacedItem.style.display = 'none';
    }
    catch (err) {
        throw new Error('failedMagnetInit, caused by ' + err.toString());
    }
}
