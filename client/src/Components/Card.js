import React from 'react'
import './card.css'

const Card = props => {
	const { authorAddress, title, genre, ipfsHash, price, date } = props

	return (
		<article className='card'>
			<header className='card-title'>
				<p>{date}</p>
				<h2>{title}</h2>
			</header>

			<div className='card-author'>
				<a className='author-avatar' href='#'>
					<img src='../dbooks-logo.svg' />
				</a>
				<svg className='half-circle' viewBox='0 0 106 57'>
					<path d='M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4'></path>
				</svg>

				<div className='author'>
					<div className='author-heading'>Author</div>
					{authorAddress.slice(0, 4) +
						'...' +
						authorAddress.slice(authorAddress.length - 4, authorAddress.length)}
				</div>
			</div>
			<div className='tags'>
				<a href='#'>{genre}</a>
			</div>
		</article>
	)
}

export default Card
