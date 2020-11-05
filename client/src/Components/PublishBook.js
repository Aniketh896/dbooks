import React, { useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
import Button from '@material-ui/core/Button'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import DrizzleForm from './pages/DrizzleForm'
import ipfs from '../ipfs'
import { IconButton, makeStyles } from '@material-ui/core'

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PublishBook({ drizzle, drizzleState, initialized }) {
	const classes = useStyles()

	const [dbktBalance, setDbktBalance] = useState(0)
	const [epubFile, setEpubFile] = useState()
	const [ipfsHash, setIpfsHash] = useState()
	const [buffer, setBuffer] = useState('')

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

	const onSubmit = async (event) => {
		event.preventDefault()

		console.log('on submit')
		await ipfs.add(buffer, (err, ipfsHash) => {
			console.log(err, ipfsHash)
			setIpfsHash(ipfsHash[0].hash)
		})
	}

	if (!initialized) {
		return 'loading....'
	}

	return (
		<div className={classes.container}>
			<DrizzleForm
				ipfsHash={ipfsHash}
				method='publishBook'
				drizzle={drizzle}
				drizzleState={drizzleState}
				initialized={initialized}>
				<div>
					<AccountData
						drizzle={drizzle}
						drizzleState={drizzleState}
						accountIndex={0}
						units='ether'
						precision={3}
						render={({ address, balance, units }) => (
							<div>
								My Address: <span style={{ color: 'red' }}>{address}</span> <br />
								MATIC Token: <span style={{ color: 'red' }}>{balance}</span> {units}
								My DBKT: <span style={{ color: 'red' }}>{dbktBalance}</span> {units}
							</div>
						)}
					/>

					<h2>SimpleStorage</h2>
					<p>
						This shows a simple ContractData component with no arguments, along with a
						form to set its value.
					</p>
				</div>

				<div>
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
								aria-label='upload picture'
								component='span'
								variant='contained'
								startIcon={<CloudUploadIcon />}>
								Select epub file
							</Button>
						</label>
						<div>
							selected file: {epubFile}
						</div>
						<button variant='contained' color='default' component='span'>
							Upload
						</button>
					</form>
				</div>
			</DrizzleForm>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	container: {
		marginTop: '20%',
		backgroundColor: '#17141d',
		height: '100%',
		width: '100%',
		color: '#e4e4e4',
	},
}))
