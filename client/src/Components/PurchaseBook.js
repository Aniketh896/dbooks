import React, { useEffect, useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
import { useParams, useLocation } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import DrizzleForm from './pages/DrizzleForm'
import ipfs from '../ipfs'
import {
	Card,
	CardActions,
	CardContent,
	Container,
	Divider,
	IconButton,
	makeStyles,
	Paper,
	Typography,
} from '@material-ui/core'

const Alert = props => {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const useQuery = () => {
	return new URLSearchParams(useLocation().search)
}

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PurchaseBook({ drizzle, drizzleState, initialized }) {
	const classes = useStyles()

	const [dbktBalance, setDbktBalance] = useState(0)
	const [uploadOpen, setUploadOpen] = useState(false)
	const [publishOpen, setPublishOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

	const query = useQuery()

	const title = query.get('title')
	const author = query.get('author')
	const ipfsHash = query.get('ipfsHash')
	const price = query.get('price')

	const setBalance = async () => {
		const balance = await drizzle.contracts.DBookToken.methods
			.balanceOf(drizzleState.accounts[0])
			.call()

		// console.log('[DEBUG] balance: ', balance)
		setDbktBalance(balance)
	}

	useEffect(() => {
		if (initialized) {
			setBalance()
		}
	}, [initialized])

	const handleCloseUpload = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setUploadOpen(false)
	}

	const handleClosePublish = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setPublishOpen(false)
	}

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setErrorOpen(false)
	}

	const purchaseBook = async () => {
		const web3 = drizzle.web3

		const EBookStorage = drizzle.contracts.EBookStorage
		const EBookStorageWeb3 = new web3.eth.Contract(EBookStorage.abi, EBookStorage.address)

		EBookStorageWeb3.methods
			.purchaseBook(drizzleState.accounts[0], ipfsHash, price)
			.send({ from: drizzleState.accounts[0] })
			.then(rx => {
				console.log('[DEBUG] rx: ', rx)
			})
			.catch(err => {
				console.error(err.message)
				console.log(err)
				setErrorMessage('failed to purchase book')
				setErrorOpen(true)
			})
	}

	const increaseAllowance = async () => {
		const web3 = drizzle.web3
		const DBKTContract = drizzle.contracts.DBookToken
		const EBookStorage = drizzle.contracts.EBookStorage
		const DBKTContractWeb3 = new web3.eth.Contract(DBKTContract.abi, DBKTContract.address)

		DBKTContractWeb3.methods
			.faucet(drizzleState.accounts[0], 50)
			.send({ from: drizzleState.accounts[0] })
			.then(rx => {
				DBKTContractWeb3.methods
					.increaseAllowance(EBookStorage.address, 1000)
					.send({ from: drizzleState.accounts[0] })
			})
			.catch(err => {
				console.error(err.message)
				console.log(err)
				setErrorMessage('Failed to increase allowance')
				setErrorOpen(true)
			})
	}

	if (!initialized) {
		return 'Loading...'
	}

	return (
		<Container maxWidth='sm' className={classes.container}>
			<div
				style={{
					marginBottom: 20,
					backgroundColor: '#2F4F4F',
					padding: 10,
					borderRadius: 5,
				}}>
				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={0}
					units='ether'
					precision={3}
					render={({ address, balance, units }) => (
						<div>
							<div>
								<Typography variant='h6' style={{ color: 'white' }}>
									My Address: <span style={{ color: 'aqua' }}>{address}</span>{' '}
									<br />
								</Typography>
								<Typography variant='h6' style={{ color: 'white' }}>
									MATIC Token: <span style={{ color: 'aqua' }}>{balance}</span>
								</Typography>
								<Typography variant='h6'
								style={{ color: 'white' }}>
									My DBKT: <span style={{ color: 'aqua' }}>{dbktBalance}</span>
								</Typography>
							</div>
							<div>
								<Button varaint='contained' onClick={increaseAllowance} style={{ color: 'aqua' }}>
									Increase Allowance
								</Button>
							</div>
						</div>
					)}
				/>
			</div>

			<Divider />

			<div>
				<Card
					style={{
						backgroundColor: '#2F4F4F',
					}}>
					<CardContent>
						<Typography variant='h2' style={{ color: 'aqua' }}>
							<span>{title}</span>
						</Typography>
						<Typography variant='caption' style={{ color: 'white' }}>
							by, <span>{author}</span>
						</Typography>
						<Typography variant='body1' style={{ color: 'white' }}>
							price: <span>{price}</span>
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='medium' onClick={purchaseBook} style={{ color: 'aqua' }}>
							Purchase
						</Button>
					</CardActions>
				</Card>
			</div>

			<div className={classes.snackbars}>
				<Snackbar open={uploadOpen} autoHideDuration={6000} onClose={handleCloseUpload}>
					<Alert onClose={handleCloseUpload} severity='success'>
						Uploaded file successfully!
					</Alert>
				</Snackbar>
				<Snackbar open={publishOpen} autoHideDuration={6000} onClose={handleClosePublish}>
					<Alert onClose={handleClosePublish} severity='success'>
						Purchased ebook successfully!
					</Alert>
				</Snackbar>
				<Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleErrorClose}>
					<Alert onClose={handleErrorClose} severity='error'>
						{errorMessage}
					</Alert>
				</Snackbar>
			</div>
		</Container>
	)
}

const useStyles = makeStyles(theme => ({
	formContainer: {},
	container: {
		// backgroundColor: '#17141d',
		paddingTop: '10%',
		height: '100%',
		width: '100%',
		color: '#141414',
	},
	fileForm: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: 40,
		marginTop: 40,
		marginBottom: 40,
	},
	snackbars: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))
