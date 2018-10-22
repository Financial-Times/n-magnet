import React from 'react';
import {Eventpromo} from '@financial-times/x-eventpromo';
import xEngine from '@financial-times/x-engine';

export async function renderEventpromo (magnetPlaceholderSelector, magnetData) {
    try {
        const promoElement = <Eventpromo isPaused={true} {...magnetData.data} />;
        xEngine.render(promoElement, magnetPlaceholderSelector);
    }
    catch (err) {
        throw new Error('failed to render magnet, cause:' + err.toString());
    }
}