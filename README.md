# n-magnet [![CircleCI](https://circleci.com/gh/Financial-Times/n-magnet.svg?style=svg)](https://circleci.com/gh/Financial-Times/n-magnet)
- orchestrates onward journey components (better promo, newsletters, etc)

## Documentation
https://docs.google.com/document/d/1nJKG7-xOzZyhKTmJMz9M2FA9P-AQgOVPZD1F_MmX3o4/edit
### Related flags 
- https://toggler.ft.com/#showEventPromo
- https://toggler.ft.com/#newsletterSignupOnArticle
### Related Repos
- https://github.com/Financial-Times/next-magnet-api
- https://github.com/Financial-Times/n-eventpromo
- https://github.com/Financial-Times/n-newsletter-signup

## Using the component
### Add the component
`npm install @financial-times/n-magnet`
### Configuration
Some configuration variable can be overridden using ENV variables.

|config name|env name|example|desc|
|---|---|---|---|
|demo.host|DEMO_HOST|local.ft.com||
|demo.port|DEMO_PORT|5005||

### Prepare DOM
The component expects some elements to be present in the DOM
- `.js-magnet-cta'`: required, the component will be loaded in this element
- `.js-magnet-data` : optional, should contain a json object with the conceptIds used by the article
```html
<script class="js-magnet-data" type="application/json">{{{json articleMainConcepts}}}</script>
<div class="magnet-cta js-magnet-cta" data-trackable="magnet-cta"></div>
```
### Initialise the component
- call magnetInit() from n-magnet
```javascript
import { magnetInit } from '@financial-times/n-magnet';

magnetInit().then(()=>{
    const replacedItem = document.querySelector('.js-instant-alert-cta');
    replacedItem.style.display = 'none';
})
.catch((err) => {
    // fail silently
    // eslint-disable-next-line no-console
    console.debug('failed to init magnet', err);
});
```
### Running tests
```jshelllanguage
# linting, unit-test
make test
# unit test only
make unit-test
# without coverage
npm run jest 
```
### Running the demo
```
make install
make demo
```

You can then visit local demonstration pages:

- [eventpromo-demo](http://localhost:5005/eventpromo-demo)
- [newsletter-demo](http://localhost:5005/newsletter-demo)

## Known issues / to do
### oGrid issue
Demo is broken by `src/components/newsletter-signup/main.js`

Error: ```main.js:14 Uncaught TypeError: oGrid.setMinSupportedIeVersion is not a function```

Meaning the demo only works with eventpromo and newsletter-signup/main.js needs to be commented out...

### Build process
After some struggle with the build process, styles and js are built separately.

This can probably be improved.

### Prettier
Add prettier to the project?

## Notes
When working on integration with next-article, it can be useful to tweak package.json like this:
- use specific branch: `@financial-times/n-magnet": "Financial-Times/n-magnet#magnet-api-integration",`
- use local package: `@financial-times/n-magnet": "file:/home/devel/ft/n-magnet",`
