import React, { useEffect, useState } from 'react'

import EBookListing from './Components/EBookListing'
import Navcomponent from './Components/Navcomponent'
import Homepage from './Components/pages/Homepage'
import { portis } from './drizzleOptions'
import { makeStyles } from '@material-ui/core'
import './App.css'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

//to add files to ipfs when using it, under event handler.
/*ipfs.add(this.state.buffer, (error,result) => {
	//do stuff here...
})*/

const App = props => {
	const classes = useStyles()

	const [walletAddress, setWalletAddress] = useState()
	const [email, setEmail] = useState()
	const [reputation, setReputation] = useState()

	useEffect(() => {
		portis.onLogin((walletAddress, email, reputation) => {
			setWalletAddress(walletAddress)
			setEmail(email)
			setReputation(reputation)

			// console.log(walletAddress, email, reputation)
		})

		portis.onLogout(() => {
			setWalletAddress('')
			setEmail('')
			setReputation('')

			console.log('User logged out')
		})
	}, [])

	return (
		<div>
			<div className={classes.navigation}>
				<Navcomponent walletAddress={walletAddress} email={email} reputation={reputation} />
			</div>
			<div className='container' style={{ display: 'flex', flexDirection: 'column' }}>
				<EBookListing {...props} />
				<Homepage />
			</div>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
	navigation: {
		marginTop: 0,
		marginBottom: 'auto',
		position: 'fixed',
		width: '100%',
		height: 63.99,
	},
}))

export default App
