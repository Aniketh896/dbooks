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
import portislogo from '../../portis_logo.svg'
import maticlogo from '../../matic-logo-white.svg'
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
              <div style={{ marginLeft: "auto" }}>
                <Button
                  variant=""
                  style={{ color: "white" }}
                  onClick={(e) => portis.showPortis()}
                >
                  <p style={{ fontSize: "20px" }}>Login</p>
                </Button>
              </div>
              <div
                style={{
                  paddingTop: "100px",
                  height: "70%",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}
              >
                <div>
                  <img className="image" src={logo} alt="logo" />
                  <p style={{paddingTop: "5rem", fontSize:"2rem", fontWeight:'100', width:'100%', color:'#fff8cd'}}>
                    <Typical
                      loop={Infinity}
                      steps={[
                        'Decentralized',
                        2000,
                        'Immutable',
                        2000,
                        'Secure',
                        2000,
                        'Easy to Use',
                        2000,
                      ]}
                    />
                  </p>

                  <p
                    className="para"
                    style={{ marginTop: "50px", maxWidth: "50rem" }}
                  >
                    A completely{" "}
                    <strong style={{ color: "yellow" }}>Decentralized</strong>{" "}
                    marketplace for selling and buying of ebooks. Anyone can
                    easily upload their ebooks on the platform, which can then
                    be purchased by others. Our in-built{" "}
                    <strong style={{ color: "yellow" }}>eReader</strong>{" "}
                    restricts external downloads, so it curbs piracy by making
                    sure copyrighted books can’t be shared or circulated
                    illegally.
                  </p>
                </div>
                <div style={{ paddingTop: "120px"}}>
                  <img src="/books.svg" alt="" style={{ width: "30rem", marginLeft: "auto", float: "right"}} />
                </div>
              </div>
              <div className="ourteam">
                <p>Our Development Team</p>
                <div style={{ marginTop: "70px" }}>
                  <DevTeam />
                </div>
              </div>
            </div>
            <hr/>
            <br/>
            <footer className="footer">
              <ul>
                <li  style={{marginTop:'20px'}}>
                  <a href="#">
                    <EmailIcon fontSize="large" />
                    <span>Email ID</span>
                  </a>
                </li>
                <li  style={{marginTop:'20px'}}>
                  <a href="#">
                    <LinkedInIcon fontSize="large" />
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li  style={{marginTop:'20px'}}>
                  <a href="#">
                    <GitHubIcon fontSize="large" />
                    <span>Github</span>
                  </a>
                </li>
                <li
                  style={{
                    marginLeft: "auto",
                    marginBottom: "auto",
                    display: "flex",
                  }}
                >
                  <span>Powered by - </span>
                  <span>
                    <a href="#" style={{ marginLeft: "40px"}}>
                      <img
                        src={portislogo}
                        alt="portis"
                        style={{ width: "100px" }}
                      />
                    </a>
                  </span>
                  <span>
                    <a href="#">
                      <img
                        src={maticlogo}
                        alt="matic"
                        style={{ width: "150px"}}
                      />
                    </a>
                  </span>
                </li>
              </ul>
            </footer>
          </div>
        )}
      </div>
    );
}      

export default Landingpage
