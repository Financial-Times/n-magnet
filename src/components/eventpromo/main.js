import React from 'react';
import {Eventpromo} from '@financial-times/x-eventpromo';
import xEngine from '@financial-times/x-engine';
import {getMappedData} from './eventpromo-utils';
import {dispatchTrackingEvent} from '../../lib/tracking';

export async function renderEventpromo (magnetPlaceholderSelector, data) {
    try {
        const formattedData = getMappedData(data.eventpromo);
        const promoElement = <Eventpromo isPaused={true} {...formattedData} />;
        xEngine.render(promoElement, magnetPlaceholderSelector);

        // tracking
        dispatchTrackingEvent({
            category: 'x-eventpromo',
            action: 'shown',
            eventPromoId: data.eventpromo.id
        });
    }
    catch (err) {
        throw new Error(`failed to render eventpromo, cause: ${err.toString()}`);
    }
}