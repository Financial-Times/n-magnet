/** @jsx h */
import { h } from 'preact';
import Form from './Form';
import classnames from 'classnames';

export default function NewsletterSignup({
	isPremium,
	imageUrl,
	newsletterId,
	name,
	description,
	frequency,
	userNeedsToUpgrade,
	userIsSubscribed,
	updatingPreference
}) {
	return (
		<section
			data-component="n-newsletter-signup"
			className={classnames({
				'n-newsletter-signup': true,
				'n-newsletter-signup--premium': isPremium
			})}
			data-newsletter-id={newsletterId}
			data-newsletter-name={name}
			data-newsletter-is-premium={isPremium}
		>
			{imageUrl && (
				<div className="n-newsletter-signup__image">
					<picture>
						<source srcSet={imageUrl} />
						<img src={imageUrl} alt="" data-component="newsletter-picture" />
					</picture>
				</div>
			)}

			<div className="n-newsletter-signup__content">
				<h2>
					{name}
					<span className="o-normalise-visually-hidden">
						{isPremium ? ', premium' : ''}
						{frequency ? `, ${frequency}` : ''}
					</span>
				</h2>

				{isPremium && (
					<span
						aria-hidden="true"
						className="n-newsletter-signup__top-meta o-labels o-labels--content-premium"
					>
						Premium
					</span>
				)}

				<p>{description}</p>
			</div>

			{userNeedsToUpgrade ? (
				<a
					href="/products?location=/newsletters"
					className="n-newsletter-signup__upgrade ft-concept-button__link"
					data-trackable="newsletters-upgrade"
				>
					Upgrade
					<span className="o-normalise-visually-hidden">&nbsp; your subscription to receive {{ name }}</span>
				</a>
			) : (
				<Form
					newsletterId={newsletterId}
					name={name}
					userIsSubscribed={userIsSubscribed}
					updatingPreference={updatingPreference}
				/>
			)}
		</section>
	);
}
