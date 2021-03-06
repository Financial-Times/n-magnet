const express = require('@financial-times/n-internal-tool');
const conceptFixture = require('./fixtures/concept.json');
const newsletterFixture = require('./fixtures/promos/newsletter.json');
const forumFixture = require('./fixtures/promos/forumpromo.json');
const magnetTemplate = require('./templates/magnet.js');
const homeTemplate = require('./templates/home');

const chalk = require('chalk');
const errorHighlight = chalk.bold.red;
const highlight = chalk.bold.green;

const demoPort = 5005;

const app = module.exports = express({
	name: 'public',
	systemCode: 'n-magnet',
	withFlags: false,
	withHandlebars: true,
	withNavigation: false,
	withAnonMiddleware: false,
	hasHeadCss: false,
	viewsDirectory: '/demos/templates',
	partialsDirectory: process.cwd(),
	directory: process.cwd(),
	demo: true,
	s3o: false
});

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
		res.status(204).json({nope: true});
	} else {
		next();
	}
});

const demoUrls = {
	...Object.keys(eventPromoFixtures).reduce((acc, brand) => ({
		...acc,
		[`${brand} eventpromo`]: `/eventpromo-demo/${brand}`
	}), {}),
	'forumpromo': '/forumpromo-demo',
	'newsletterpromo': '/newsletter-demo'
};

app.get('/', (req, res) => {
	res.send(homeTemplate({demoUrls}));
});

app.get('/eventpromo-demo/:brand', (req, res) => {
	res.send(magnetTemplate({
		title: `Test magnet app: ${req.params.brand} eventpromo`,
		conceptFixture: JSON.stringify(conceptFixture)
	}));
});

app.get('/forumpromo-demo', (req, res) => {
	res.send(magnetTemplate({
		title: 'Test magnet app: forumpromo',
		conceptFixture: JSON.stringify(conceptFixture)
	}));
});


app.get('/newsletter-demo', (req, res) => {
	res.send(magnetTemplate({
		title: 'Test magnet app: newsletter',
		conceptFixture: JSON.stringify(conceptFixture)
	}));
});

app.use('/magnet-demo/static', express.static('dist/demo'));

//Mock api requestS
app.post('/magnet/api/', (req, res) => {
	const referer = req.header('Referer');

	let fixture;
	if (referer.includes('forumpromo-demo')) {
		fixture = forumFixture;
	} else if (referer.includes('eventpromo-demo')) {
		const brand = referer.split('/').reverse()[0];
		fixture = eventPromoFixtures[brand];
	} else {
		fixture = newsletterFixture;
	}

	res.send(fixture);
});

app.post('/eventpromo/api/save-view', (req, res) => {
	res.send({});
});

function runPa11yTests() {
	const spawn = require('child_process').spawn;
	const pa11y = spawn('pa11y-ci');

	pa11y.stdout.on('data', (data) => {
		console.log(highlight(`${data}`)); //eslint-disable-line
	});

	pa11y.stderr.on('data', (error) => {
		console.log(errorHighlight(`${error}`)); //eslint-disable-line
	});

	pa11y.on('close', (code) => {
		process.exit(code);
	});
}

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

const listen = app.listen(demoPort);

if (process.env.PA11Y === 'true') {
	listen.then(runPa11yTests);
}
