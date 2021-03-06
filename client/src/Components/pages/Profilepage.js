import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'

import Tabmenu from '../Tabmenu'

const useStyles = makeStyles({
	root: {
		marginTop: '63.99px',
		overflow: 'hidden',
	},
	content: {
		overflow: 'auto',
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},

	page: {
		display: 'flex',
	},

	token: {
		marginLeft: 'auto',
		marginRight: '50px',
	},

	user: {
		marginLeft: 20,
		marginTop: 20,
		marginRight: 20,
		width: 400,
	},
	card: {
		maxWidth: 345,
		margin: '0 auto',
		backgroundColor:'#a6f6f1',
		borderRadius:'15px'
	},
	pic: {
		width: 200,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		paddingTop: 10,
		paddingBottom: 10,
	},
	dp: {
		height: 50,
	},
})

const Profilepage = props => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.token}>
					<Chip label='Token' style={{ marginTop: '20px' }} />
				</div>
				<div className={classes.page}>
					<div className={classes.user}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia className={classes.pic}>
									<img
										src='https://www.flaticon.com/svg/static/icons/svg/236/236832.svg'
										alt='profile pic'
										style={{
											height: 200,
											margin: '10 auto',
											borderRadius: '50%',
											border: '1px solid #41aea9',
										}}
									/>
								</CardMedia>
								<CardContent style={{ backgroundColor: '#28abb9' }}>
									<Typography gutterBottom variant='h5' component='h2'>
										{props.email}
									</Typography>
									<Typography
										style={{ fontSize: '18px' }}
										variant='body2'
										color='textSecondary'
										component='p'>
										<strong>Bio: </strong>I am an author in making and trying my
										chances in the writer's world. I like writing suspense
										stories and drama.
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions style={{ backgroundColor: '#28abb9' }}>
								<Button variant='contained' size='small' color='primary'>
									Edit
								</Button>
							</CardActions>
						</Card>
					</div>
					<div className='tabs' style={{ width: '100%', marginRight: '20px' }}>
						<Tabmenu {...props} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Profilepage
