import React from 'react'
import { createRoot } from 'react-dom/client'
import { Eventpromo } from '@financial-times/n-eventpromo'
import { getMappedData } from './utils'

export default function eventPromo(container, data) {
	const formattedData = getMappedData(data)
	createRoot(container).render(<Eventpromo isPaused={true} {...formattedData} />)

	window.addEventListener(
		'load',
		() => {
			const target = document.querySelector('.js-magnet-cta')
			const options = {
				root: null,
				threshold: 0.5,
			}
			const observer = new IntersectionObserver((entries, observer) => {
				entries.forEach(async function (entry) {
					if (entry.isIntersecting || entry.intersectionRatio > 0) {
						try {
							await fetch(`/magnet/api/eventpromo/save-view/${data.id}`, {
								headers: {
									accept: 'application/json',
									'content-type': 'application/json',
								},
								method: 'POST',
							})
						} catch (error) {
							// fail silently
						}
						observer.unobserve(entry.target)
					}
				})
			}, options)
			observer.observe(target)
		},
		false,
	)
}
