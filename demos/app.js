require('@dotcom-reliability-kit/crash-handler')();

const nExpress = require('@financial-times/n-express');
const { init: assetLoaderMiddleware } = require('@financial-times/dotcom-middleware-asset-loader');
const conceptFixture = require('./fixtures/concept.json');
const newsletterFixture = require('./fixtures/promos/newsletter.json');
const forumFixture = require('./fixtures/promos/forumpromo.json');
const magnetTemplate = require('./templates/magnet.js');
const homeTemplate = require('./templates/home');

const app = (module.exports = nExpress({
	name: 'public',
	systemCode: 'n-magnet',
	withFlags: false,
	withHandlebars: false,
	withNavigation: false,
	withAnonMiddleware: false,
	withBackendAuthentication: false,
	withConsent: false,
	viewsDirectory: '/demos/templates',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	healthChecks: [],
	demo: true
}));

app.use(
	assetLoaderMiddleware({
		// in production, assets are hosted on S3. in development, this app will need to serve them.
		hostStaticAssets: true,
		publicPath: '/__dev/assets/n-magnet'
	})
);

app.get('/__gtg', (_req, res) => res.sendStatus(200));

const eventPromoFixtures = {
	'ft-live': require('./fixtures/promos/eventpromo/ft-live.json'),
	'ft-forums': require('./fixtures/promos/eventpromo/ft-forums.json'),
	'ft-bdp:workshop': require('./fixtures/promos/eventpromo/bpd-workshop.json'),
	'ft-bdp:diploma': require('./fixtures/promos/eventpromo/bpd-diploma.json'),
	'ft-bdp:masterclass': require('./fixtures/promos/eventpromo/bpd-masterclass.json'),
	'ft-bdp:online-course': require('./fixtures/promos/eventpromo/bpd-online-course.json')
};

//ignore favicon request for demo
app.use((req, res, next) => {
	if (req.originalUrl === '/favicon.ico') {
		res.status(204).json({ nope: true });
	} else {
		next();
	}
});

const demoUrls = {
	...Object.keys(eventPromoFixtures).reduce(
		(acc, brand) => ({
			...acc,
			[`${brand} eventpromo`]: `/eventpromo-demo/${brand}`
		}),
		{}
	),
	forumpromo: '/forumpromo-demo',
	newsletterpromo: '/newsletter-demo'
};

app.get('/', (_request, response) => {
	response.send(
		homeTemplate({
			demoUrls,
			assetLoader: response.locals.assetLoader
		})
	);
});

app.get(
	'/eventpromo-demo/:brand',
	demoPage({
		title: (request) => `Test magnet app: ${request.params.brand} eventpromo`,
		magnetData: conceptFixture
	})
);

app.get(
	'/forumpromo-demo',
	demoPage({
		title: 'Test magnet app: forumpromo',
		magnetData: conceptFixture
	})
);

app.get(
	'/newsletter-demo',
	demoPage({
		title: 'Test magnet app: newsletter',
		magnetData: conceptFixture
	})
);

function demoPage(props) {
	return function (request, response) {
		response.send(
			magnetTemplate({
				...props,
				assetLoader: response.locals.assetLoader,
				title: typeof props?.title === 'function' ? props.title(request) : props.title
			})
		);
	};
}

// app.use('/magnet-demo/static', nExpress.static('public'));

//Mock api requestS
app.post('/magnet/api/', (request, response) => {
	const referer = request.header('Referer');

	let fixture;
	if (referer.includes('forumpromo-demo')) {
		fixture = forumFixture;
	} else if (referer.includes('eventpromo-demo')) {
		const brand = referer.split('/').reverse()[0];
		fixture = eventPromoFixtures[brand];
	} else {
		fixture = {
			type: 'newsletter',
			data: newsletterFixture[1]
		};
	}

	response.send(fixture);
});

app.post('/magnet/api/eventpromo/save-view/:id', (_request, response) => {
	response.send({});
});

app.post('/__myft/api/alerts/:user/newsletters/:newsletter/subscribe', (request, response) => {
	response.json({
		isPremium: true,
		referenceId: 'ft',
		unsubscribeAction: `/__myft/api/alerts/${request.params.user}/newsletters/${request.params.newsletter}/unsubscribe`,
		subscribeAction: `/__myft/api/alerts/${request.params.user}/newsletters/${request.params.newsletter}/subscribe`,
		id: request.params.newsletter,
		name: 'FT',
		subscriptionLevel: 'Premium',
		inactive: false,
		description:
			"News, analysis and comment from the Financial Times, the world's leading global business publication.",
		frequency: 'daily',
		userIsSubscribed: true
	});
});

app.post('/__myft/api/alerts/:user/newsletters/:newsletter/unsubscribe', (request, response) => {
	response.json({
		isPremium: true,
		referenceId: 'ft',
		unsubscribeAction: `/__myft/api/alerts/${request.params.user}/newsletters/${request.params.newsletter}/unsubscribe`,
		subscribeAction: `/__myft/api/alerts/${request.params.user}/newsletters/${request.params.newsletter}/subscribe`,
		id: request.params.newsletter,
		name: 'FT',
		subscriptionLevel: 'Premium',
		inactive: false,
		description:
			"News, analysis and comment from the Financial Times, the world's leading global business publication.",
		frequency: 'daily',
		userIsSubscribed: false
	});
});

app.use(function (req, res, next) {
	if (!req.route) {
		/* eslint-disable-next-line no-console */
		console.log('404 error', {
			method: req.method,
			url: req.protocol + '://' + req.get('host') + req.originalUrl
		});
		return next(new Error('404: ' + req.route));
	}
	next();
});

app.listen(process.env.PORT || 5005);
