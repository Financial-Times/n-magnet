const config = require('../src/lib/config');
const demoConfig = config.get('demo');

module.exports = {
	'type': 'eventpromo',
	'data': {
		'concepts': [
			{
				'id': '19b95057-4614-45fb-9306-4d54049354db',
				'predicate': 'http://www.ft.com/ontology/hasEventFocus'
			},
			{
				'id': 'd90b783d-8eb9-30bb-b078-c0cef19bacb0',
				'predicate': 'http://www.ft.com/ontology/hasEventLocation'
			}
		],
		'description': 'The Financial Times is proud to announce the third FT Brexit and Beyond Summit. As negotiations continue, agreements are made and the shape of Brexit becomes clearer, stakeholders from business, politics and academia will gather in June 2018 to discuss what it all means.\n\nHear expert analysis on the latest developments	from senior FT journalists plugged into Westminster, Brussels and the UK regions. Explore the economic transition facing the UK, listen to case studies of how businesses are planning for the future and discuss how success can be achieved in a post-Brexit landscape.',
		'displayStartTime': '2018-05-15T07:00:00.000Z',
		'eventUrl': 'https://live.ft.com/Events/2018/FT-Brexit-and-Beyond-Summit',
		'id': 'f17e63fd1eda51789dc5e6bdd8e3dfae',
		'imageUrl': 'https://live.ft.com/var/ftlive/storage/images/events/2018/ft-brexit-and-beyond-summit/888258-7-eng-GB/FT-Brexit-and-Beyond-Summit.png',
		'lastUpdate': '1525098575',
		'scheduledEndTime': '2018-11-14T18:00:00.000Z',
		'scheduledStartTime': '2018-11-12T07:00:00.000Z',
		'score': 0,
		'sectorTags': [
			'Boris',
			'May',
			'Junker'
		],
		'segmentId': '11259aab-28bd-cf0b-29c5-d6cde7eeac80',
		'strapline': 'Planning for Post-Brexit Growth',
		'title': 'FT Brexit and Beyond Summit',
		'location': 'Planet Earth',
		'viewLink': `http://${demoConfig.host}:${demoConfig.port}/eventpromo/api/save-view`
	}
};
