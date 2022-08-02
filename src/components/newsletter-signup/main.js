import * as newsletterSignup from '@financial-times/n-newsletter-signup';
import mainTemplate from '@financial-times/n-newsletter-signup/templates/simple.html';
import { dispatchTrackingEvent } from '../../lib/tracking';

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
