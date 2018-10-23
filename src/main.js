import {getMagnetData} from './lib/magnet-engine';
import {loadModule} from './lib/magnet-renderer';

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
        magnetData = await getMagnetData(conceptIds);
    }
    catch (err) {
        throw new Error(`error on getMagnetDataFromApi, caused by ${err.toString()}`);
    }

    try {
        await loadModule(magnetPlaceholderSelector, magnetData);

        const replacedItem = document.querySelector('.js-instant-alert-cta');
        replacedItem.style.display = 'none';
    }
    catch (err) {
        throw new Error('failedMagnetInit, caused by ' + err.toString());
    }
}
