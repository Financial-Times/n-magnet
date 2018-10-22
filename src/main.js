import React from 'React';
import renderEventpromo from 'components/eventpromo/main'

async function getMagnetDataFromApi (conceptIds = []) {
    const apiUrl = 'http://local.ft.com/magnet/api';

    try {
        const fetchResponse = await fetch(apiUrl, {
            body: JSON.stringify(conceptIds),
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const jsonResponse = await fetchResponse.json();

        return jsonResponse;
    }
    catch (err) {
        throw new Error('magnet-api failure, cause:' + err.toString());
    }
}


async function loadModule (magnetPlaceholderSelector, magnetData)
{
    console.log('loadModule', magnetData);
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
        magnetData = await getMagnetDataFromApi(conceptIds);
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
