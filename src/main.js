import { hasValidConcepts } from './lib/hasValidConcepts'
import { getDataFromApi } from './lib/magnet-api-client'
import eventPromo from './components/eventpromo/main'
import newsletterSignup from './components/newsletter-signup/main'
import forumPromo from './components/forumpromo/main'
import { segmentId } from './config'

export async function init({ flags = {}, oTracking } = {}) {
	const dataElement = document.querySelector('.js-magnet-data')
	const container = document.querySelector('.js-magnet-cta')

	if (!dataElement || !container) {
		throw new Error('DOM not ready for magnet')
	}

	let conceptIds
	try {
		conceptIds = JSON.parse(dataElement.innerHTML)
	} catch (err) {
		err.message = `failed to parse magnetDataSelector, caused by ${err.message}`
		throw err
	}

	const validConcepts = hasValidConcepts(conceptIds) ? conceptIds : {}

	if (!validConcepts) {
		// eslint-disable-next-line no-console
		console.warn('no valid concepts for article')
	}

	const { type, data } = await getDataFromApi(validConcepts, flags)

	let trackingDetail = {}

	try {
		if (type === 'eventpromo') {
			eventPromo(container, data)
			trackingDetail = {
				category: 'n-eventpromo',
				brand: data.brand,
				eventPromoId: data.id,
			}
		} else if (type === 'forumpromo') {
			forumPromo(container, data)
			trackingDetail = {
				category: 'n-forumpromo',
				forumId: data.id,
			}
		} else if (type === 'newsletter') {
			newsletterSignup(container, data)
			trackingDetail = {
				category: 'n-newsletter-signup',
				newsletterId: data.id,
			}
		}
	} catch (err) {
		err.message = `magnet failed to load module of type ${type}, cause: ${err.message}`
		throw err
	}

	if (trackingDetail.category) {
		document.body.dispatchEvent(
			new CustomEvent('oTracking.event', {
				detail: {
					...trackingDetail,
					action: 'shown',
					segmentId,
				},
				bubbles: true,
			}),
		)
	}

	;(oTracking ?? window['oTracking'])?.view?.init?.({
		selector: '[data-trackable="magnet-cta"]',
		category: 'component',
		action: 'view',
		context: undefined,
		getContextData: () => ({
			component: {
				name: 'magnet-slot',
				type: 'container',
			},
		}),
	})
}
