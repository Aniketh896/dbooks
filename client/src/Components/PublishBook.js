import React, { useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import DrizzleForm from './pages/DrizzleForm'
import ipfs from '../ipfs'
import { Container, Divider, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PublishBook({ drizzle, drizzleState, initialized }) {
	const classes = useStyles()

	const [dbktBalance, setDbktBalance] = useState(0)
	const [epubFile, setEpubFile] = useState()
	const [ipfsHash, setIpfsHash] = useState()
	const [buffer, setBuffer] = useState('')
	const [uploadOpen, setUploadOpen] = useState(false)
	const [publishOpen, setPublishOpen] = useState(false)

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

	const captureFile = event => {
		event.stopPropagation()
		event.preventDefault()

		const file = event.target.files[0]
		setEpubFile(file.name)
		let reader = new window.FileReader()

		reader.readAsArrayBuffer(file)
		reader.onloadend = () => convertToBuffer(reader)
	}

	const convertToBuffer = async reader => {
		const buffer = await Buffer.from(reader.result)
		setBuffer(buffer)
	}

	const onSubmit = async event => {
		event.preventDefault()

		console.log('on submit')
		await ipfs.add(buffer, (err, ipfsHash) => {
			console.log(err, ipfsHash)
			setIpfsHash(ipfsHash[0].hash)
			setUploadOpen(true)
		})
	}

	if (!initialized) {
		return 'loading....'
	}

	return (
		<Container maxWidth='lg' className={classes.container}>
			<div style={{ marginBottom: 20 }}>
				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={0}
					units='ether'
					precision={3}
					render={({ address, balance, units }) => (
						<>
							<Typography variant='h6'>
								My Address: <span style={{ color: 'red' }}>{address}</span> <br />
							</Typography>
							<Typography variant='h6'>
								MATIC Token: <span style={{ color: 'red' }}>{balance}</span>
							</Typography>
							<Typography variant='h6'>
								My DBKT: <span style={{ color: 'red' }}>{dbktBalance}</span>
							</Typography>
						</>
					)}
				/>
			</div>

			<Divider />

			<div className={classes.formContainer}>
				<Typography variant='h2' style={{ fontWeight: 700 }}>
					Publish your book
				</Typography>
				<DrizzleForm
					ipfsHash={ipfsHash}
					method='publishBook'
					drizzle={drizzle}
					drizzleState={drizzleState}
					initialized={initialized}
					setPublishOpen={setPublishOpen}
				/>
			</div>

			<Divider />

			<div className={classes.fileForm}>
				<form onSubmit={onSubmit}>
					<input
						type='file'
						accept='.epub'
						onChange={captureFile}
						style={{ display: 'none' }}
						id='icon-button-file'
					/>
					<label htmlFor='icon-button-file'>
						<Button
							color='default'
							aria-label='upload epub'
							component='span'
							variant='contained'
							startIcon={<CloudUploadIcon />}>
							Select epub file
						</Button>
					</label>
					<Button
						variant='contained'
						color='default'
						component='span'
						onClick={onSubmit}
						style={{ marginLeft: 20 }}>
						Upload
					</Button>
				</form>

				<Typography variant='h6'>selected filename: {epubFile}</Typography>
			</div>
			
			<Divider />

			<div className={classes.root}>
				<Snackbar open={uploadOpen} autoHideDuration={6000} onClose={handleCloseUpload}>
					<Alert onClose={handleCloseUpload} severity='success'>
						Uploaded file successfully!
					</Alert>
				</Snackbar>
				<Snackbar open={publishOpen} autoHideDuration={6000} onClose={handleClosePublish}>
					<Alert onClose={handleClosePublish} severity='success'>
						Published ebook successfully!
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
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))
