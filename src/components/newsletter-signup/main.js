/** @jsx h */
import { h, render } from 'preact';
import { local as store } from 'superstore-sync';
import Cookies from 'js-cookie';
import ConceptButton from '@financial-times/ft-concept-button';
import NewsletterSignup from './NewsletterSignup';

export default function init(container, data) {
	render(<NewsletterSignup {...data} />, container);
	new Newsletter(container.querySelector('[data-component="n-newsletter-signup"]'));
}

class Newsletter {
	constructor(el) {
		if (!el) {
			return;
		}
		this.el = el;
		this.newsletterName = el.dataset.newsletterName;
		this.newsletterForm = el.querySelector('form');
		this.newsletterId = el.dataset.newsletterId;
		this.newsletterButton = this.el.querySelector('.n-newsletter-signup__submit');
		this.feedback = new Feedback(this.el, this.newsletterName, this.newsletterId);
		this.conceptButton =
			ConceptButton.init(this.newsletterForm)[0] || ConceptButton.init(this.newsletterForm);
		this.newsletterForm.addEventListener('submit', (event) => {
			event.preventDefault();
			this.handleSubmit(event);
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.el.setAttribute('aria-busy', 'true');
		this.feedback.update('update');
		const url = event.target.action;
		const action = url.indexOf('unsubscribe') > -1 ? 'unsubscribe' : 'subscribe';

		fetch(url, {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				token: Cookies.get('FTSession_s')?.slice(-36) ?? ''
			})
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error('Bad server response');
				}

				this.update(action);
				this.newsletterForm.dispatchEvent(
					new CustomEvent(`newsletter.${action}`, {
						detail: this.newsletterId
					})
				);
				if (action === 'subscribe') {
					store.set(`n-newsletter-signup.${this.newsletterId}.subscribedTime`, Date.now());
				}
			})
			.catch((error) => {
				this.feedback.update('error');
				this.el.setAttribute('aria-busy', 'false');
				document.body.dispatchEvent(
					new CustomEvent('oErrors.log', {
						bubbles: true,
						cancelable: true,
						detail: {
							error: error,
							info: {
								reason: 'Failed newsletter signup'
							}
						}
					})
				);
			});
	}

	update(action) {
		this.render(action);
		this.feedback.update('success');
		this.el.setAttribute('aria-busy', 'false');
	}

	render(action) {
		let formAction;
		let buttonAriaLabel;
		let buttonTitle;
		let buttonDataTrackable;
		let buttonText;

		if (action === 'subscribe') {
			formAction = this.newsletterForm.action.replace('subscribe', 'unsubscribe');
			buttonAriaLabel = this.newsletterButton
				.getAttribute('aria-label')
				.replace('Subscribe to', 'Unsubscribe from');
			buttonTitle = this.newsletterButton.title.replace('Subscribe to', 'Unsubscribe from');
			buttonDataTrackable = 'newsletter-unsubscribe';
			buttonText = this.newsletterButton.innerHTML.replace('Sign Up', 'Signed Up');
			this.conceptButton.isPressed = !this.conceptButton.isPressed;
		} else {
			formAction = this.newsletterForm.action.replace('unsubscribe', 'subscribe');
			buttonAriaLabel = this.newsletterButton.getAttribute('aria-label');
			buttonTitle = this.newsletterButton.title.replace('Unsubscribe from', 'Subscribe to');
			buttonDataTrackable = 'newsletter-subscribe';
			buttonText = this.newsletterButton.innerHTML.replace(/(Subscribed)|(Unsubscribe)/, 'Sign Up');
			this.el.classList.remove('n-newsletter-signup--subscribed');
		}

		this.newsletterForm.action = formAction;
		this.newsletterButton.setAttribute('aria-label', buttonAriaLabel);
		this.newsletterButton.title = buttonTitle;
		this.newsletterButton.dataset.trackable = buttonDataTrackable;
		this.newsletterButton.innerHTML = buttonText;
	}
}

class Feedback {
	constructor(parent, name, id) {
		this.parentHtml = parent;
		this.html = document.createElement('p');
		this.state = 'default';
		this.name = name;
		this.id = id;
		this.append(parent);
	}

	defaultAttributes() {
		this.html.dataset.component = 'feedback';
		this.html.setAttribute('aria-live', 'polite');
		this.html.setAttribute('aria-atomic', 'true');
		this.html.classList.add('n-newsletter-signup__feedback');
		this.html.classList.add('n-newsletter-signup__feedback--hidden');
		this.html.id = `feedback-message__newsletter-${this.id}`;
	}

	updatePresentation() {
		this.html.classList.add(`n-newsletter-signup__feedback--${this.state}`);

		if (this.state === 'error') {
			this.html.classList.remove('n-newsletter-signup__feedback--hidden');
		}
	}

	updateMessage(message) {
		this.html.innerHTML = message;
	}

	append() {
		this.defaultAttributes();
		if (this.parentHtml.nextSibling) {
			this.parentHtml.parentNode.insertBefore(this.html, this.parentHtml.nextSibling);
		} else {
			this.parentHtml.parentNode.appendChild(this.html);
		}
	}

	update(state) {
		this.state = state || this.state;
		let message = this.setMessage(state);

		if (!message) {
			return;
		}

		this.updatePresentation();
		this.updateMessage(message);
	}

	setMessage(state) {
		switch (state) {
			case 'update':
				return `Updating subscription to ${this.name}`;
			case 'success':
				return `Successfully updated your ${this.name} subscription preference`;
			case 'error':
				return `Something went wrong updating your subscription to ${this.name}. Please try again.`;
			default:
				return false;
		}
	}
}
