/** @jsx h */
import {Eventpromo} from '@financial-times/n-eventpromo';
import {h, render} from '@financial-times/x-engine';
import {getMappedData} from './eventpromo-utils';
import {dispatchTrackingEvent} from '../../lib/tracking';

async function saveView (viewLink) {
	// notify eventpromo-api that this event has been seen
	await fetch(viewLink, {
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
		},
		method: 'POST',
	});
}

export async function renderEventpromo (magnetPlaceholderSelector, data) {
	try {
		const formattedData = getMappedData(data);
		const promoElement = <Eventpromo isPaused={true} {...formattedData} />;
		const viewLink = data.viewLink;
		render(promoElement, magnetPlaceholderSelector);

		// tracking
		dispatchTrackingEvent({
			category: 'n-eventpromo',
			action: 'shown',
			brand: formattedData.brand,
			eventPromoId: formattedData.id
		});

		if (viewLink) {
			window.addEventListener('load', () => {
				const target = document.querySelector('.js-magnet-cta');
				const options = {
					root: null,
					threshold: 0.5
				};
				const observer = new IntersectionObserver((entries, observer) => {
					entries.forEach(async function (entry) {
						if (entry.isIntersecting || entry.intersectionRatio > 0) {
							try {
								await saveView(viewLink);
							} catch (error) {
								// fail silently
							}
							observer.unobserve(entry.target);
						}
					});
				}, options);
				observer.observe(target);
			}, false);
		}
	}
	catch (err) {
		err.message = `failed to render eventpromo, cause: ${err.message}`;
		throw err;
	}
}
