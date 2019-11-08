import mainTemplate from './template.html';
import {dispatchTrackingEvent} from '../../lib/tracking';

function onChange (changes) {
	changes.forEach(change => {
		if(change.isIntersecting || change.intersectionRatio > 0) {
			dispatchTrackingEvent({
				action: 'view',
				category: 'component',
				context: {
					component: 'end-of-article-newsletter-promo'
				}
			});
			this.unobserve(change.target);
		}
	});
}

export async function renderGenericNewsletterPromo (magnetPlaceholderSelector) {
	const compiledTemplate = mainTemplate();
	magnetPlaceholderSelector.innerHTML = compiledTemplate;

	const observer = new IntersectionObserver(onChange, { threshold: [ 1.0 ] });
	observer.observe(magnetPlaceholderSelector);

	// tracking
	dispatchTrackingEvent({
		category: 'end-of-article-newsletter-promo',
		action: 'shown',
	});
}
