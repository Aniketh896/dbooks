import React, { useEffect, useState } from 'react'
import { Drizzle } from '@drizzle/store'
import { DrizzleContext } from '@drizzle/react-plugin'

import EBookListing from './Components/EBookListing'
import Navcomponent from './Components/Navcomponent'
import Leftbar from './Components/Leftbar'
import Bookcard from './Components/Bookcard'
import Homepage from './Components/pages/Homepage'
import drizzleOptions, { portis } from './drizzleOptions'
import './App.css'
import { makeStyles } from '@material-ui/core'

const drizzle = new Drizzle(drizzleOptions)

const App = () => {
  const classes = useStyles()

  const [walletAddress, setWalletAddress] = useState()
  const [email, setEmail] = useState()
  const [reputation, setReputation] = useState()

  useEffect(() => {
    portis.onLogin((walletAddress, email, reputation) => {
      setWalletAddress(walletAddress)
      setEmail(email)
      setReputation(reputation)

      console.log(walletAddress, email, reputation)
    })

    portis.onLogout(() => {
      setWalletAddress('')
      setEmail('')
      setReputation('')

      console.log('User logged out');
    });
  }, [])

	return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <div className={classes.navigation}>
          <Navcomponent walletAddress={walletAddress} email={email} reputation={reputation} />
      </div>
			<div className='container' style={{ display: 'flex', flexDirection: 'column' }}>
        <EBookListing />
				<Homepage />
			</div>
    </DrizzleContext.Provider>
	)
}

const useStyles = makeStyles((theme) => ({
  navigation: {
    marginTop: 0,
    marginBottom: 'auto',
    position: 'fixed',
    width: '100%',
    height: 63.99,
  }
}))

export default App
