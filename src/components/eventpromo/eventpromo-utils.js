import ftDateFormat from '@financial-times/ft-date-format';
import * as config from '../../lib/config';

export function getFormattedDate (theEvent) {
	const year = ftDateFormat.format(theEvent.scheduledStartTime, 'yyyy');
	const eventStart = ftDateFormat.format(theEvent.scheduledStartTime, 'dd MMMM');
	const eventEnd = ftDateFormat.format(theEvent.scheduledEndTime, 'dd MMMM');
	if (eventStart === eventEnd) {
		return `${eventStart} ${year}`;
	} else {
		return `${eventStart} - ${eventEnd} ${year}`;
	}
}

export function getMappedData (theEvent) {
	const eventUrl = new URL(theEvent.eventUrl);
	const images = [theEvent.imageUrl, ...config.get('eventpromoAnimationStaticImages')];

	eventUrl.searchParams.set('segmentId', theEvent.segmentId);

	return {
		dates: getFormattedDate(theEvent),
		id: theEvent.id,
		images,
		link: eventUrl.toString(),
		location: theEvent.location,
		segmentId: theEvent.segmentId,
		strapline: theEvent.strapline,
		title: theEvent.title
	};
}
