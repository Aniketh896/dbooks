import React, { useCallback, useEffect, useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { useDropzone } from 'react-dropzone'

import DrizzleForm from './pages/DrizzleForm'
import ipfs from '../ipfs'
import { Container, Divider, IconButton, makeStyles, Paper, Typography } from '@material-ui/core'

function Alert(props) {
	return <MuiAlert elevation={6} variant='filled' {...props} />
}

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PublishBook({ drizzle, drizzleState, initialized }) {
	const classes = useStyles()

	// const onDrop = useCallback(acceptedFiles => {
	// 	console.log(acceptedFiles)
	// 	setCover(acceptedFiles[0])

	// 	const reader = new FileReader()

	// 	reader.onabort = () => console.log('file reading was aborted')
	// 	reader.onerror = () => console.log('file reading has failed')
	// 	reader.onload = () => {
	// 		const binaryStr = reader.result
	// 		ipfs.files.write(acceptedFiles[0].name, binaryStr)
	// 	}
	// 	reader.readAsArrayBuffer(file)
	// }, [])
	// const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	const [dbktBalance, setDbktBalance] = useState(0)
	const [epubFile, setEpubFile] = useState()
	const [ipfsHash, setIpfsHash] = useState()
	const [cover, setCover] = useState()
	const [buffer, setBuffer] = useState('')
	const [uploadOpen, setUploadOpen] = useState(false)
	const [publishOpen, setPublishOpen] = useState(false)
	const [errorOpen, setErrorOpen] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')

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

	const handleErrorClose = (event, reason) => {
		if (reason === 'clickaway') {
			return
		}

		setErrorOpen(false)
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
		<Container maxWidth='lg' className={classes.container}  style={{backgroundColor: 'white'}}>
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
				<div>
					<Typography variant='h2' style={{ fontWeight: 700 }}>
						Publish your book
					</Typography>
					<DrizzleForm
						method='publishBook'
						drizzle={drizzle}
						drizzleState={drizzleState}
						initialized={initialized}
						setPublishOpen={setPublishOpen}
						setErrorOpen={setErrorOpen}
					/>
				</div>
												{/* 
				<div {...getRootProps()}>
					<input {...getInputProps()} accept='.jpg, .jpeg, .png' />
					{isDragActive ? (
						<p>Drop the cover here ...</p>
					) : (
						<div
							style={{
								width: 400,
								height: 200,
								border: '1px dashed blue',
								margin: 'auto',
							}}>
							<img src={cover.name} />
							Select the cover
						</div>
					)}
				</div> */}
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

				<Typography variant='h6' style={{ margin: 5}}>selected filename: {epubFile}</Typography>
				<Typography variant='h5' style={{ margin: 5}}>IPFS Hash: {ipfsHash}</Typography>
			</div>

			<Divider />

			<div className={classes.root}>
				<Snackbar open={uploadOpen} autoHideDuration={6000} onClose={handleCloseUpload}>
					<Alert onClose={handleCloseUpload} severity='success'>
						Uploaded file successfully!
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
	formContainer: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
	},
	container: {
		// backgroundColor: '#17141d',
		paddingTop: '10%',
		height: '100%',
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
