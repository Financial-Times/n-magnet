const express = require('@financial-times/n-internal-tool');
const conceptFixture = require('./conceptFixture.json');
const eventFixture = require('./eventpromoFixture.json');
const newsletterFixture = require('./newsletterFixture.json');
const magnetTemplate = require('./templates/magnet.js');

const chalk = require('chalk');
const errorHighlight = chalk.bold.red;
const highlight = chalk.bold.green;

const demoPort = 5005;
const demoHost = 'local.ft.com';

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

//ignore favicon request for demo
app.use((req, res, next) => {
	if (req.originalUrl === '/favicon.ico') {
		res.status(204).json({nope: true});
	} else {
		next();
	}
});

app.get('/', (req, res) => {
	res.send({
		'eventpromo-demo': `http://${demoHost}:${demoPort}/eventpromo-demo`,
		'newsletter-demo': `http://${demoHost}:${demoPort}/newsletter-demo`
	});
});

app.get('/magnet-demo', (req, res) => {
	res.send({
		'eventpromo-demo': `http://${demoHost}:${demoPort}/eventpromo-demo`,
		'newsletter-demo': `http://${demoHost}:${demoPort}/newsletter-demo`
	});
});

app.get('/eventpromo-demo', (req, res) => {
	res.send(magnetTemplate({
		title: 'Test magnet app: eventpromo',
		conceptFixture: JSON.stringify(conceptFixture)
	}));
});

app.get('/newsletter-demo', (req, res) => {
	res.send(magnetTemplate({
		title: 'Test magnet app: newsletter',
		conceptFixture: JSON.stringify(conceptFixture)
	}));
});

app.get('/generic-newsletter-promo', (req, res) => {
	res.send(magnetTemplate({
		title: 'Test magnet app: generic newsletter promo',
		conceptFixture: JSON.stringify(conceptFixture),
	}));
});

app.use('/magnet-demo/static', express.static('dist/demo'));

//Mock api requestS
app.post('/magnet/api/', (req, res) => {
	const referer = req.header('Referer');

	let fixture;
	if (referer.indexOf('generic-newsletter') > 1) {
		fixture = { type: 'usNewsletterPromo' };
	} else if (referer.indexOf('newsletter') > 1) {
		fixture = newsletterFixture;
	} else {
		fixture = eventFixture;
	}
	res.send(fixture);
});

app.post('/eventpromo/api/save-view', (req, res) => {
	res.send({});
});

function runPa11yTests () {
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
