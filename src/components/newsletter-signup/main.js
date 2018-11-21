import {dispatchTrackingEvent} from '../../lib/tracking';

export async function renderNewsletterSignup (magnetPlaceholderSelector, data) {
    magnetPlaceholderSelector.innerHTML = JSON.stringify(data);

    // tracking
    dispatchTrackingEvent({
        category: 'x-eventpromo',
        action: 'shown',
        eventPromoId: data.eventpromo.id
    });
}