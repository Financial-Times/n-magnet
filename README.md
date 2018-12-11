# n-magnet
- orchestrates onward journey components (better promo, newsletters, etc)

## Documentation
### Related flags 
- showArticleCTABloc
- showEventPromo
### Repos
- https://github.com/Financial-Times/next-magnet-api
- https://github.com/Financial-Times/x-dash

## Using the component
### Add the component
`npm install @financial-times/n-magnet`
### Configuration
Some configuration variable can be overridden using ENV variables.

|config name|env name|example|desc|
|---|---|---|---|
|magnetDataSourceUrl|MAGNET_DATASOURCE_URL|http://local.ft.com/magnet/api|api endpoint|
|demo.host|DEMO_HOST|local.ft.com||
|demo.port|DEMO_PORT|5005||

### Prepare DOM
The component expects some elements to be present in the DOM
- `.js-magnet-cta'`: required, the component will be loaded in this element
- `.js-magnet-data` : optional, should contain a json object with the conceptIds used by the article
```html
{{#if @root.flags.showArticleCTABloc}}
<script class="js-magnet-data" type="application/json">{{{json articleMainConcepts}}}</script>
<div class="magnet-cta js-magnet-cta" data-trackable="magnet-cta"></div>
{{/if}}
```
### Initialise the component
- simply call magnetInit() from n-magnet
```javascript
import { magnetInit } from '@financial-times/n-magnet';

if(flags.get('showArticleCTABloc')) {
    magnetInit().then(()=>{
        const replacedItem = document.querySelector('.js-instant-alert-cta');
        replacedItem.style.display = 'none';
    })
    .catch((err) => {
        // fail silently
        // eslint-disable-next-line no-console
        console.debug('failed to init magnet', err);
    });
    }
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
The demo will be served on port 5005, at: http://local.ft.com:5005/magnet-demo

## Notes
When working on integration with next-article, it can be useful to tweak package.json like this:
" use specific branch: @financial-times/n-magnet": "Financial-Times/n-magnet#magnet-api-integration",
" use local package: @financial-times/n-magnet": "file:/home/devel/ft/n-magnet",