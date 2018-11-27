import {dispatchTrackingEvent} from '../../lib/tracking';

export async function renderNewsletterSignup (magnetPlaceholderSelector, data) {
    magnetPlaceholderSelector.innerHTML = JSON.stringify(data);

    // tracking
    dispatchTrackingEvent({
        category: 'n-newsletter-signup',
        action: 'shown',
        newsletterId: data.newsletter.id
    });
}