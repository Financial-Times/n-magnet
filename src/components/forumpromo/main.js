/** @jsx h */
import { h, render } from 'preact';
import { Forumpromo } from '@financial-times/n-eventpromo';
import { segmentId } from '../../config';

export default function forumPromo(container, data) {
	const forumUrl = new URL(data.link);
	forumUrl.searchParams.set('segmentId', segmentId);
	data.link = forumUrl.href;
	render(<Forumpromo {...data} />, container);
}
