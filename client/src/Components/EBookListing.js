import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import options from '../drizzleOptions'
import { Card } from './Card'

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

		return await EBContractWeb3.getPastEvents(event, options)
	}

	const setupBookListing = async () => {
		const events = await getPastEvents('publishedBookEvent', {})

		let newEBookList = []

		events.forEach(log => {
			console.log('[DEBUG] log: ', log)
			const authorAddress = log.returnValues[0]
			const ipfsHash = log.returnValues[1]
			const title = log.returnValues[2]
			const price = log.returnValues[3]

			const ebook = {
				authorAddress,
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
		<div>
			{ebookList.map(ebook => (
				<Card key={ebook.ipfsHash} {...ebook} />
			))}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity='success'>
					This is a success message!
				</Alert>
			</Snackbar>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))
