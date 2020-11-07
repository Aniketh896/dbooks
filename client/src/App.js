import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
import { makeStyles, Modal } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

// import Homepage from './Components/pages/Homepage'
import Profilepage from './Components/pages/Profilepage'
import DBookReader from './Components/pages/DBookReader'

import EBookListing from './Components/EBookListing'
import Navcomponent from './Components/Navcomponent'
import LoadingImg from './Components/Loading'
import PublishBook from './Components/PublishBook'
import Landingpage from './Components/pages/Landingpage'
import PurchaseBook from './Components/PurchaseBook'

import { portis } from './drizzleOptions'
import './App.css'

const App = props => {
	const classes = useStyles()
	const { initialized } = props

	const [loading, setLoading] = useState(false)

	// useEffect(() => {
	// 	if (initialized) {
	// 		setLoading(false)
	// 	} else {
	// 		setLoading(true)
	// 	}
	// }, [initialized])

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
		<Router>
			<CssBaseline />

			<div
<<<<<<< Updated upstream
				className='container'
				style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#373a40' }}>
=======
				className='container'>
>>>>>>> Stashed changes
				<Switch className='route-wrapper'>
					{walletAddress ? (
						<>
							<div className={classes.navigation}>
								<Navcomponent
									walletAddress={walletAddress}
									email={email}
									reputation={reputation}
								/>
							</div>
							<Route exact path='/'>
								<Profilepage {...props} />
							</Route>
							<Route exact path='/ebooks'>
								<EBookListing {...props} />
							</Route>
							{/* <Route exact path='/user'>
								<Profilepage {...props} />
							</Route> */}
							<Route exact path='/publish'>
								<PublishBook {...props} />
							</Route>
							<Route exact path='/purchase'>
								<PurchaseBook {...props} />
							</Route>
							<Route exact path='/clientLibrary'>
								<EBookListing {...props} />
							</Route>
							<Route exact path='/DBookReader'>
								<DBookReader {...props} />
							</Route>
						</>
					) : (
						<div>
							<Landingpage />
						</div>
					)}
				</Switch>
			</div>
			<Modal
				open={loading}
				aria-labelledby='simple-modal-title'
				aria-describedby='simple-modal-description'
				style={{ display: 'grid', placeItems: 'center' }}
				BackdropProps={{ style: { backgroundColor: '#17141d' } }}>
				<LoadingImg />
			</Modal>
		</Router>
	)
}

const useStyles = makeStyles(theme => ({
	navigation: {
		marginTop: 0,
		marginBottom: 'auto',
		position: 'fixed',
		width: '100%',
		height: 63.99,
		zIndex: theme.zIndex.drawer + 1,
	},
}))

export default App
