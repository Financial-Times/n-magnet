import ftDateFormat from '@financial-times/ft-date-format';
import * as config from '../../lib/config';

export function getFormattedDate(event) {
	const year = ftDateFormat.format(event.scheduledStartTime, 'yyyy');
	const eventStart = ftDateFormat.format(event.scheduledStartTime, 'dd MMMM');
	const eventEnd = ftDateFormat.format(event.scheduledEndTime, 'dd MMMM');
	if (eventStart === eventEnd) {
		return `${eventStart} ${year}`;
	} else {
		return `${eventStart} - ${eventEnd} ${year}`;
	}
}

export function getMappedData(event) {
	const eventUrl = new URL(event.eventUrl);
	eventUrl.searchParams.set('segmentId', event.segmentId);
	return {
		id: event.id,
		brand: event.brand,
		title: event.title,
		strapline: event.strapline,
		dates: getFormattedDate(event),
		location: event.location,
		link: eventUrl.toString(),
		imageUrl: event.imageUrl || config.get('eventpromoDefaultImage'),
		segmentId: event.segmentId
	};
}
