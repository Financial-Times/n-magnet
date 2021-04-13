/** @jsx h */
import {Forumpromo} from '@financial-times/n-eventpromo';
import {h, render} from '@financial-times/x-engine';
import {dispatchTrackingEvent} from '../../lib/tracking';

export function renderForumpromo(magnetPlaceholderSelector, data) {
	try {
		const promoElement = <Forumpromo {...data} />;
		render(promoElement, magnetPlaceholderSelector);

		// tracking
		dispatchTrackingEvent({
			category: 'n-forumpromo',
			action: 'shown',
			forumId: data.id
		});
	} catch (err) {
		err.message = `failed to render forumpromo, cause: ${err.message}`;
		throw err;
	}
}
