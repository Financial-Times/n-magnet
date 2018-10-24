import React from 'react';
import {Eventpromo} from '@financial-times/x-eventpromo';
import xEngine from '@financial-times/x-engine';
import {getMappedData} from './eventpromo-utils';
import * as config from '../../lib/config';

export async function renderEventpromo (magnetPlaceholderSelector, data) {

    try {
        const formattedData = getMappedData(data.eventpromo);
        const promoElement = <Eventpromo isPaused={true} {...formattedData} />;
        xEngine.render(promoElement, magnetPlaceholderSelector);

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
        throw new Error(`failed to render eventpromo, cause: ${err.toString()}`);
    }
}