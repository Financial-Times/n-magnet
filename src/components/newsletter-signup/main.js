import newsletterSignup from 'n-newsletter-signup/js/main';
import mainTemplate from 'n-newsletter-signup/templates/simple.html';
import {dispatchTrackingEvent} from '../../lib/tracking';

export async function renderNewsletterSignup (magnetPlaceholderSelector, data) {
	const compiledTemplate = mainTemplate(data);
	magnetPlaceholderSelector.innerHTML = compiledTemplate;
	newsletterSignup.init(magnetPlaceholderSelector);

	// tracking
	dispatchTrackingEvent({
		category: 'n-newsletter-signup',
		action: 'shown',
		newsletterId: data.id
	});
}
