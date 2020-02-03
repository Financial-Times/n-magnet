import {renderEventpromo} from '../components/eventpromo/main';
import {renderNewsletterSignup} from '../components/newsletter-signup/main';
import {renderGenericNewsletterPromo} from '../components/generic-newsletter-promo/main';

export async function renderModule (magnetPlaceholderSelector, magnetData) {
	try {
		if (magnetData.type === 'eventpromo') {
			await renderEventpromo(magnetPlaceholderSelector, magnetData.data);
		}
		else if (magnetData.type === 'newsletter') {
			await renderNewsletterSignup(magnetPlaceholderSelector, magnetData.data);
		}
		else if (magnetData.type === 'usNewsletterPromo') {
			await renderGenericNewsletterPromo(magnetPlaceholderSelector);
		}
	}
	catch (err) {
		err.message = `magnet failed to load module of type ${magnetData.type}, cause: ${err.message}`;
		throw err;
	}
}
