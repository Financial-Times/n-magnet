import React from 'react';
import {Eventpromo} from '@financial-times/n-eventpromo';
import xEngine from '@financial-times/x-engine';
import {getMappedData} from './eventpromo-utils';
import {dispatchTrackingEvent} from '../../lib/tracking';

async function saveView (viewLink, formattedData) {
	// notify eventpromo-api that this event has been seen
	const requestBody = {eventpromoId: formattedData.id};
	await fetch(viewLink, {
		body: JSON.stringify(requestBody),
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
		xEngine.render(promoElement, magnetPlaceholderSelector);

		// tracking
		dispatchTrackingEvent({
			category: 'n-eventpromo',
			action: 'shown',
			eventPromoId: formattedData.id
		});

		window.addEventListener('load', () => {
			const target = document.querySelector('.js-magnet-cta');
			const options = {
				root: null,
				threshold: 0.5
			};
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(async function (entry) {
					if (entry.isIntersecting || entry.intersectionRatio > 0) {
						await saveView(viewLink, formattedData);
						observer.unobserve(entry.target);
					}
				});
			}, options);
			observer.observe(target);
		}, false);
	}
	catch (err) {
		throw new Error(`failed to render eventpromo, cause: ${err.toString()}`);
	}
}
