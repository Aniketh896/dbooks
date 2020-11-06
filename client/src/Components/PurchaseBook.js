import React, { useEffect, useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
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

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PurchaseBook({
	drizzle,
	drizzleState,
	initialized,
	ipfsHash,
	price,
	author,
	title,
}) {
	const classes = useStyles()

	const [dbktBalance, setDbktBalance] = useState(0)
	const [uploadOpen, setUploadOpen] = useState(false)
	const [publishOpen, setPublishOpen] = useState(false)

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
	}

	if (!initialized) {
		return 'Loading...'
	}

	return (
		<Container maxWidth='sm' className={classes.container}>
			<div style={{ marginBottom: 20 }}>
				<DrizzleForm
					ipfsHash={ipfsHash}
					price={price}
					method='purchaseBook'
					drizzle={drizzle}
					drizzleState={drizzleState}
					initialized={initialized}
				/>

				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={0}
					units='ether'
					precision={3}
					render={({ address, balance, units }) => (
						<div>
							<div>
								<Typography variant='h6'>
									My Address: <span style={{ color: 'red' }}>{address}</span>{' '}
									<br />
								</Typography>
								<Typography variant='h6'>
									MATIC Token: <span style={{ color: 'red' }}>{balance}</span>
								</Typography>
								<Typography variant='h6'>
									My DBKT: <span style={{ color: 'red' }}>{dbktBalance}</span>
								</Typography>
							</div>
							<div>
								<Button varaint='contained' onClick={increaseAllowance}>
									Increase Allowance
								</Button>
							</div>
						</div>
					)}
				/>
			</div>

			<Divider />

			<div>
				<Card>
					<CardContent>
						<Typography variant='h2'>
							<span>{title}</span>
						</Typography>
						<Typography variant='caption'>
							by, <span>{author}</span>
						</Typography>
						<Typography variant='body1'>
							price: <span>{price}</span>
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='medium' onClick={purchaseBook}>
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
