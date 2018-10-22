const config = require('../lib/config');
const {getFormattedDate} = require('./event-date');

function getMappedData (theEvent) {
	const eventUrl = new URL(theEvent.eventUrl);
    const images = [theEvent.imageUrl, ...config.get('animationStaticImages')];

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
};

module.exports = {
	getMappedData
};