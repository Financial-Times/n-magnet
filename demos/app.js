require('@dotcom-reliability-kit/crash-handler')()

const nExpress = require('@financial-times/n-express')
	name: 'public',
	systemCode: 'n-magnet',
	withFlags: false,
	withHandlebars: false,
	withNavigation: false,
	withAnonMiddleware: false,
	withConsent: false,
	viewsDirectory: '/demos/templates',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	healthChecks: [],
	demo: true,
}))

app.use(

const eventPromoFixtures = {
	'ft-live': require('./fixtures/promos/eventpromo/ft-live.json'),
	'ft-forums': require('./fixtures/promos/eventpromo/ft-forums.json'),
	'ft-bdp:workshop': require('./fixtures/promos/eventpromo/bpd-workshop.json'),
	'ft-bdp:diploma': require('./fixtures/promos/eventpromo/bpd-diploma.json'),
	'ft-bdp:masterclass': require('./fixtures/promos/eventpromo/bpd-masterclass.json'),
	'ft-bdp:online-course': require('./fixtures/promos/eventpromo/bpd-online-course.json'),
}

//ignore favicon request for demo
app.use((req, res, next) => {
	if (req.originalUrl === '/favicon.ico') {
		res.status(204).json({ nope: true })
	} else {
		next()
	}
})

const demoUrls = {
	...Object.keys(eventPromoFixtures).reduce(
		(acc, brand) => ({
			...acc,
			[`${brand} eventpromo`]: `/eventpromo-demo/${brand}`,
		}),
		{},
	),
	forumpromo: '/forumpromo-demo',
	newsletterpromo: '/newsletter-demo',
	newslettersList: '/newsletters-list-demo',
}

app.get('/', (req, res) => {
  res.send(homeTemplate({ demoUrls }));
});

app.get('/eventpromo-demo/:brand', (req, res) => {
  res.send(
    magnetTemplate({
      title: `Test magnet app: ${req.params.brand} eventpromo`,
      conceptFixture: JSON.stringify(conceptFixture)
    })
  );
});

app.get('/forumpromo-demo', (req, res) => {
  res.send(
    magnetTemplate({
      title: 'Test magnet app: forumpromo',
      conceptFixture: JSON.stringify(conceptFixture)
    })
  );
});

app.get('/newsletter-demo', (req, res) => {
  res.send(
    magnetTemplate({
      title: 'Test magnet app: newsletter',
      conceptFixture: JSON.stringify(conceptFixture)
    })
  );
});

app.use('/magnet-demo/static', express.static('dist/demo'));

//Mock api requestS
app.post('/magnet/api/', (req, res) => {
  const referer = req.header('Referer');

	response.send({})
})

app.post('/__myft/api/alerts/:user/newsletters/:newsletter/subscribe', (request, response) => {

app.use(function (req, res, next) {
	if (!req.route) {
		/* eslint-disable-next-line no-console */
		console.log('404 error', {
			method: req.method,
			url: req.protocol + '://' + req.get('host') + req.originalUrl,
		})
		return next(new Error('404: ' + req.route))
	}
	next()
})

app.listen(demoPort);
