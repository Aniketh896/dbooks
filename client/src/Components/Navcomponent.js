import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { portis } from '../drizzleOptions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavComponent({ walletAddress, email, reputation }) {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<AppBar position='static' style={{ backgroundColor: '#0F1849', height: '63.99px' }}>
				<Toolbar style={{ margin: 'auto 0' }}>
					{walletAddress &&
						<> 
							<img
								src='https://www.flaticon.com/svg/static/icons/svg/236/236832.svg'
								alt='userpic'
								style={{ width: '40px' }}
							/>
							<Typography
								variant='h6'
								className={classes.title}
								style={{ marginLeft: '10px' }}>
								{walletAddress.slice(0, 4) + '...' + walletAddress.slice(walletAddress.length - 4, walletAddress.length)}
							</Typography>
						</>
					}
					<Button color='inherit' style={{ marginRight: '10px' }}>
						Home
					</Button>
					<Button color='inherit' style={{ marginRight: '10px' }}>
						Publish
					</Button>
					{walletAddress ? 
						<Button style={({ color: 'inherit' }, { backgroundColor: '#E7CAEC' })} onClick={e => portis.logout()}>
						Log out
						</Button> :
						<Button style={({ color: 'inherit' }, { backgroundColor: '#E7CAEC' })} onClick={e => portis.showPortis()} >
							Login
						</Button>
					}
				</Toolbar>
			</AppBar>
		</div>
	)
}
