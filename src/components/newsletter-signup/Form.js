/** @jsx h */
import { h, Fragment } from 'preact';

export default function Form({ newsletterId, name, userIsSubscribed, updatingPreference }) {
	let buttonTitle = `Sign Up to ${name}`;
	let buttonLabel = (
		<>
			Sign Up
			<span className="o-normalise-visually-hidden">&nbsp;to {name}</span>
		</>
	);

	if (userIsSubscribed) {
		buttonTitle = `Unsubscribe from ${name}`;
		buttonLabel = (
			<>
				Signed Up
				<span className="o-normalise-visually-hidden">&nbsp;from {name}</span>
			</>
		);
	}

	if (updatingPreference) {
		buttonLabel = (
			<>
				Updating
				<span className="o-normalise-visually-hidden">&nbsp;{name} newsletter preference</span>…
			</>
		);
	}

	return (
		<form
			className="n-newsletter-signup__form"
			data-component="n-newsletter-signup__form"
			data-newsletter-id={newsletterId}
			action={`/__myft/api/alerts/no-user-provided/newsletters/${newsletterId}/${
				userIsSubscribed ? 'unsubscribe' : 'subscribe'
			}`}
			method="POST"
		>
			<div
				className="ft-concept-button ft-concept-button--follow ft-concept-button--standard"
				data-ft-concept-button-aria-live-pressed-text={`Subscribed to ${name}} newsletter`}
				data-ft-concept-button-aria-live-unpressed-text={`Unsubscribed from ${name} newsletter`}
				data-ft-concept-button-aria-label-pressed-text={`Unsubscribe from ${name}} newsletter`}
				data-ft-concept-button-aria-label-unpressed-text={`Subscribe to ${name} newsletter`}
				data-o-component="ft-concept-button"
			>
				<div className="ft-concept-button__announcement" aria-live="assertive"></div>
				<button
					type="submit"
					disabled={updatingPreference}
					className="ft-concept-button__button n-newsletter-signup__submit"
					title={buttonTitle}
					aria-pressed={userIsSubscribed}
					aria-label={buttonTitle}
					aria-describedby={`feedback-message__newsletter-${newsletterId}`}
					data-trackable={userIsSubscribed ? 'newsletter-unsubscribe' : 'newsletter-subscribe'}
					aria-disabled={updatingPreference}
				>
					{buttonLabel}
				</button>
			</div>
		</form>
	);
}
