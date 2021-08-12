/** @jsx h */
import {Forumpromo} from '@financial-times/n-eventpromo';
import {h, render} from '@financial-times/x-engine';
import {dispatchTrackingEvent} from '../../lib/tracking';
import {getMappedData} from './eventpromo-utils';

export function renderForumpromo (magnetPlaceholderSelector, data) {
	try {
		const formattedData = getMappedData(data);
		const promoElement = <Forumpromo {...formattedData} />;
		render(promoElement, magnetPlaceholderSelector);

		// tracking
		dispatchTrackingEvent({
			category: 'n-forumpromo',
			action: 'shown',
			forumId: formattedData.id,
			segmentId: formattedData.segmentId
		});
	} catch (err) {
		err.message = `failed to render forumpromo, cause: ${err.message}`;
		throw err;
	}
}
