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

## Using the component

### Add the component

`npm install @financial-times/n-magnet`

### Configuration

Some configuration variable can be overridden using ENV variables.

| config name | env name  | example      | desc |
| ----------- | --------- | ------------ | ---- |
| demo.host   | DEMO_HOST | local.ft.com |      |
| demo.port   | DEMO_PORT | 5005         |      |

### Prepare DOM

The component expects some elements to be present in the DOM

- `.js-magnet-cta'`: required, the component will be loaded in this element
- `.js-magnet-data` : optional, should contain a json object with the conceptIds used by the article

```html
<script class="js-magnet-data" type="application/json">
  {{{json articleMainConcepts}}}
</script>
<div class="magnet-cta js-magnet-cta" data-trackable="magnet-cta"></div>
```

### Initialise the component

- call init() from n-magnet

```javascript
import * as magnet from '@financial-times/n-magnet';

magnet
  .init({ oTracking, flags })
  .then(() => {
    // Do something after the component is loaded
  })
  .catch((error) => {
    // fail silently
    // eslint-disable-next-line no-console
    console.debug('failed to init magnet', error);
  });
```

### Running the demo

```
npm install
npm run build
npm start
```

You can then visit local demonstration pages:

- [eventpromo-demo](http://localhost:5005/eventpromo-demo)
- [newsletter-demo](http://localhost:5005/newsletter-demo)
