/** @jsx h */
import { Forumpromo } from '@financial-times/n-eventpromo'
import { h, render } from '@financial-times/x-engine'
import { dispatchTrackingEvent } from '../../lib/tracking'

const segmentId = 'a3ced873-2d86-959c-46de-b9eab4c8f8d0'

export function renderForumpromo(magnetPlaceholderSelector, data) {
  try {
    const forumUrl = new URL(data.link)
    forumUrl.searchParams.set('segmentId', segmentId)
    data.link = forumUrl.href
    const promoElement = <Forumpromo {...data} />
    render(promoElement, magnetPlaceholderSelector)

    // tracking
    dispatchTrackingEvent({
      category: 'n-forumpromo',
      action: 'shown',
      forumId: data.id,
      segmentId: segmentId
    })
  } catch (err) {
    err.message = `failed to render forumpromo, cause: ${err.message}`
    throw err
  }
}
