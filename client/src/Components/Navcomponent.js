import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar } from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import { portis } from '../drizzleOptions'

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	links: {
		color: 'white',
	},
}))

export default function Navcomponent({ walletAddress, email, reputation }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<AppBar position='fixed' style={{ backgroundColor: 'rgba(47,79,79,0.5)', height: '63.99px' }}>
				<Toolbar style={{ margin: 'auto 0' }}>
					{walletAddress && (
						<>
							<img
								src="https://www.flaticon.com/svg/static/icons/svg/236/236832.svg"
								alt='userpic'
								style={{ width: '40px', borderRadius: '50%' }}
							/>
							<Typography
								variant='h6'
								className={classes.title}
								style={{ marginLeft: '10px' }}>
								{ email }
							</Typography>
						</>
					)}

					{walletAddress ? (
						<>
							<Link to='/' className={classes.links}>
								<Button color='inherit' style={{ marginRight: '10px' }}>
									User
								</Button>
							</Link>

							{/* <Link to='/user' className={classes.links}>
								<Button color='inherit' style={{ marginRight: '10px' }}>
									User
								</Button>
							</Link> */}

							<Link to='/ebooks' className={classes.links}>
								<Button color='inherit' style={{ marginRight: '10px' }}>
									Store
								</Button>
							</Link>

							<Link to='/publish' className={classes.links}>
								<Button color='inherit' style={{ marginRight: '10px' }}>
									Publish
								</Button>
							</Link>

							{/* <Link to='/purchase' className={classes.links}>
								<Button color='inherit' style={{ marginRight: '10px' }}>
									purchase
								</Button>
							</Link> */}

							<Button
								style={({ color: 'inherit' }, { backgroundColor: '#E7CAEC' })}
								onClick={e => portis.logout()}>
								Log out
							</Button>
						</>
					) : (
						<div style={{ marginLeft: 'auto' }}>
							<Button
								style={({ color: 'inherit' }, { backgroundColor: '#E7CAEC' })}
								onClick={e => portis.showPortis()}>
								Login
							</Button>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	)
}
