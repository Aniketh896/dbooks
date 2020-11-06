import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import { portis } from '../../drizzleOptions'

import Typical from "react-typical"

import EmailIcon from '@material-ui/icons/Email';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

import App from '../../App'
import DevTeam from '../DevTeam'



import logo from '../../dbooks-logo.svg'
import './Landingpage.css'


const Landingpage = (props) => {

    // const classes = useStyles()
    const { initialized } = props;

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
			setWalletAddress("")
			setEmail("")
			setReputation("")

			console.log('User logged out')
		})
	}, [])

    return (
    <div className="landingcontainer">
        {walletAddress ? (
			<>
				<App />
            
            </>
			) : (
            
                <div className="content">
                    <div className="data">
                        <div style={{marginLeft: 'auto'}}>
                            <Button
                                variant=""
                                style={{color: 'white'}}
                                onClick={e => portis.showPortis()}>
                                <p style={{fontSize: '20px'}}>Login</p>
                            </Button>
                        </div>
                        <div style={{paddingTop: '100px', height:'100%'}}>
                            <img className="image" src={logo} alt="logo"/>
                            <p style={{paddingTop: "5rem"}}>
                                <Typical
                                className = "para" 
                                loop = {Infinity}
                                wrapper = "span"
                                
                                steps = {[
                                    "Decentralized" ,1000,
                                    "Immutable" ,1000,
                                    "Secure" ,1000,
                                    "Easy to Use" ,1000
                                ]}/>

                            </p>
                            <p className="para" style={{marginTop: '50px', maxWidth:'1000px'}}>Our site helps the authors to publish and reach out people in safest way. We prevent piracy and provide full credit to the authors who have worked hard on their books</p>
                        </div>
                        <div className="ourteam">
                            <h2>Our Development Team</h2>
                            <div style={{marginTop:'100px'}}>
                                <DevTeam />
                            </div>
                        </div>
                    </div>
                    <footer className="footer">
                        <ul>
                            <li>
                                <a href="#"><EmailIcon fontSize="large"/><span>Email ID</span></a>
                            </li>
                            <li>
                                <a href="#"><LinkedInIcon fontSize="large"/><span>LinkedIn</span></a>
                            </li>
                            <li>
                                <a href="#"><GitHubIcon fontSize="large"/><span>Github</span></a>
                            </li>
                        </ul>
                        
                    </footer>
                </div>
            )
        }
    </div>
)
}      

export default Landingpage
