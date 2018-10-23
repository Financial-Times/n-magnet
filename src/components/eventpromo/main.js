import React from 'react';
import {Eventpromo} from '@financial-times/x-eventpromo';
import xEngine from '@financial-times/x-engine';
import {getMappedData} from './eventpromo-utils';
import * as config from '../../lib/config';

export async function renderEventpromo (magnetPlaceholderSelector, magnetData) {

    try {
        const formattedData = getMappedData(magnetData.data.eventpromo);
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

export async function getEventpromoFromApi (conceptIds = []) {
    try {
        const requestConceptIds = {
            conceptIds: {
                focus: conceptIds.focus || [],
                speakers: conceptIds.speakers || [],
            }
        };

        const fetchResponse = await fetch(config.get('eventpromoDataSourceUrl'), {
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
        throw new Error(`failed to get eventpromo data, cause: ${err.toString()}`);
    }
}