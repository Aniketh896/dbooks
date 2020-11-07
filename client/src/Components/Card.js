import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'

const Card = props => {
	const { author, title, ipfsHash, price } = props

	return (
		<Link to={`/purchase?title=${title}&price=${price}&ipfsHash=${ipfsHash}&author=${author}`}>
			<article className='card'>
				<header className='card-title' style={{height:'100%'}}>
					<h2>{title}</h2>
					
					
				</header>

				<div className='card-author'>
					<div className='author-avatar' href='#'>
						<img src='/dbooks-mini.svg' />
					</div>
					<svg className='half-circle' viewBox='0 0 106 57'>
						<path d='M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4'></path>
					</svg>

					<div className='author'>
						<div className='author-heading'>Author</div>
						{/* {author.slice(0, 4) + '...' + author.slice(author.length - 4, author.length)} */}
					</div>
				</div>
				<div className='tags' style={{ display: 'flex' }}>
					<div style={{ margin: 'auto', padding: '5px 20px' }} href='#'>PURCHASE FOR {price} DBTK</div>
				</div>
			</article>
		</Link>

	)
}

export default Card
