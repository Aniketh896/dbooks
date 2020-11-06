import React from 'react'
import { newContextComponents } from '@drizzle/react-components'
import { DrizzleContext } from '@drizzle/react-plugin'
import Container from '@material-ui/core/Container'
import { Button, Input, makeStyles, TextField } from '@material-ui/core'
import { Height } from '@material-ui/icons'
import Paper from '@material-ui/core/Paper'
const { AccountData, ContractData, ContractForm } = newContextComponents

const DrizzleForm = ({ drizzle, drizzleState, initialized, method, children, ipfsHash, price }) => {
	const classes = useStyles()

	if (!initialized) {
		return 'Loading...'
	}

	const { accounts } = drizzleState

	return (
		<div>
			{children}
			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='EBookStorage'
				method={method}
				labels={['IPFS Hash', 'Title', 'Price']}
				render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
					<form className={classes.formBody} onSubmit={handleSubmit}>
						{inputs.map((input, index) => {
							return (
								<TextField
									variant='outlined'
									color='secondary'
									fullWidth
									className={classes.textField}
									key={input.name}
									type={inputTypes[index]}
									name={input.name}
									value={state[input.name]}
									placeholder={input.name}
									onChange={handleInputChange}	
								/>
							)
						})}

						<Button
							key='submit'
							type='button'
							variant='contained'
							color='default'
							onClick={handleSubmit}>
							Submit
						</Button>
					</form>
				)}
			/>
		</div>
	)
}

export default DrizzleForm

const useStyles = makeStyles(theme => ({
	formBody: {
		marginTop: '20px',
		marginBottom: '20px',
		color: "white",
	},
	textField: {
		marginTop: '15px',
		marginBottom: '15px',
		'& input': {
			color: 'white',
		},
		'& .MuiOutlinedInput-root': {
			'& fieldset': {
				borderColor: 'white',
			},
			'&:hover fieldset': {
				borderColor: 'yellow',
			},
			'&.Mui-focused fieldset': {
				borderColor: 'green',
			},
		},

	},
}))
