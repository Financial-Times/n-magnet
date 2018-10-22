const staticAssetsBasePath = 'https://www.ft.com/__assets/creatives/better-promo';

module.exports = {
	//'eventpromoDataSourceUrl': 'https://www.ft.com/eventpromo/api/get-one'
	'eventpromoDataSourceUrl': 'http://local.ft.com/magnet/api',
    'apiPath': '/eventpromo/api/get-one/',
    'animationStaticImages': [
        `${staticAssetsBasePath}/break_out.jpg`,
        `${staticAssetsBasePath}/audiance_clapping.jpg`
    ]
};
