import {init as newsletterSignupInit} from 'n-newsletter-signup';
import {dispatchTrackingEvent} from '../../lib/tracking';
import mainTemplate from 'n-newsletter-signup/templates/simple.html';

export async function renderNewsletterSignup (magnetPlaceholderSelector, data) {
	const compiledTemplate = mainTemplate(data);
	magnetPlaceholderSelector.innerHTML = compiledTemplate;
	newsletterSignupInit(magnetPlaceholderSelector);

	// tracking
	dispatchTrackingEvent({
		category: 'n-newsletter-signup',
		action: 'shown',
		newsletterId: data.id
	});
}
