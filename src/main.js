import {getEventsFromApi} from './lib/event-promo-client';
import {renderEventpromo} from './components/eventpromo/main';

async function loadModule (magnetPlaceholderSelector, magnetData)
{
    try {
        if (magnetData.type === 'eventpromo') {
            await renderEventpromo(magnetPlaceholderSelector, magnetData);
        }
    }
    catch (err) {
        throw new Error(`magnet failed to load module of type ${magnetData.type}, cause: ${err.toString()}`);
    }
}

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
        magnetData = await getEventsFromApi(conceptIds);
    }
    catch (err) {
        throw new Error('error on getMagnetDataFromApi, caused by ' + err.toString());
    }

    try {
        await loadModule(magnetPlaceholderSelector, magnetData);

        const replacedItem = document.querySelector('.js-instant-alert-cta');
        replacedItem.style.display = 'none';

        /*
        // todo: remove this comment
        const loadedPromo = document.querySelector('.event-promo-inarticle') || null;
        const eventPromoId = (loadedPromo && loadedPromo.dataset.focusConcept) ? loadedPromo.dataset.focusConcept : null;

        // tracking
        broadcast('oTracking.event', {
            category: 'n-eventpromo',
            action: 'shown',
            eventPromoId
        });
        */
    }
    catch (err) {
        throw new Error('failedMagnetInit, caused by ' + err.toString());
    }
}
