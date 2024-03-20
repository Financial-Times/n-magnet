import React from 'react'
import { createRoot } from 'react-dom/client'
import { Forumpromo } from '@financial-times/n-eventpromo'
import { segmentId } from '../../config'

export default function forumPromo(container, data) {
	const forumUrl = new URL(data.link)
	forumUrl.searchParams.set('segmentId', segmentId)
	data.link = forumUrl.href
	createRoot(container).render(<Forumpromo {...data} />)
}
