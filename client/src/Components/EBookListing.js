import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Snackbar, Button } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'

import Card from './Card'
import './card.css'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

export default function EBookListing({ drizzle, drizzleState, initialized }) {
	const classes = useStyles()

	const [ebookList, setEbookList] = useState([])
	const [isReady, setIsReady] = useState(false)
	const [open, setOpen] = useState(false)

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setOpen(false)
	}

	const getPastEvents = async (event, options) => {
		const web3 = drizzle.web3
		const EBContract = drizzle.contracts.EBookStorage
		const EBContractWeb3 = new web3.eth.Contract(EBContract.abi, EBContract.address)

		console.log('[DEBUG] EBContractWeb3: ', EBContractWeb3)

		// const res = await EBContractWeb3.methods
		// 	.ebookSource('0x6A3320b1dd171bBf866115B5d515e1e618481807', 0)
		// 	.call()
		// console.log('[DEBUG] res: ', res)

		return await EBContractWeb3.getPastEvents('publishedBookEvent', {
			filter: {},
			fromBlock: 0,
			toBLock: 'latest',
		})
	}

	const setupBookListing = async () => {
		const events = await getPastEvents('publishedBookEvent', {})
		console.log('[DEBUG] events: ', events)

		let newEBookList = []

		events.forEach(log => {
			// console.log('[DEBUG] log: ', log)
			const author = log.returnValues[0]
			const ipfsHash = log.returnValues[1]
			const title = log.returnValues[2]
			const price = log.returnValues[3]

			const ebook = {
				author,
				ipfsHash,
				title,
				price,
			}

			newEBookList.push(ebook)
		})

		setEbookList(newEBookList)
	}

	useEffect(() => {
		if (initialized) {
			setupBookListing()
		}
	}, [initialized])

	if (!initialized) {
		return 'Loading...'
	}

	return (
		<Container maxWidth='lg' className={classes.container}>
			<Typography variant='h3' align='center' style={{marginTop:'50px'}}>
				
				Purchase a book
			
			</Typography>

			<div className={classes.wrapper}>
				<div className='book'>
					{ebookList.map(ebook => (
						<Card key={ebook.ipfsHash} {...ebook} />
						// <div key={ebook.ipfsHash}>
						// 	<div>Author {ebook.author}</div>
						// 	<div>IPFS HASH {ebook.ipfsHash}</div>
						// 	<div>Title {ebook.title}</div>
						// 	<div>Price {ebook.price}</div>
						// </div>
					))}
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
						<Alert onClose={handleClose} severity='success'>
							This is a success message!
						</Alert>
					</Snackbar>
				</div>
			</div>
		</Container>
	)
}

const useStyles = makeStyles(theme => ({
	wrapper: {
		width: '100%',
		height: '100%',
	},
	container: {
		paddingTop: 64,
		display: 'grid',
		width: '100%',
		height: '100%',
		color: 'white'
	},
}))
