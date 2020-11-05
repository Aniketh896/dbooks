import React from 'react'
import { newContextComponents } from '@drizzle/react-components'
import { DrizzleContext } from '@drizzle/react-plugin'
import Container from '@material-ui/core/Container'
import { Button, Input, makeStyles, TextField } from '@material-ui/core'
import { Height } from '@material-ui/icons'
import Paper from '@material-ui/core/Paper'
const { AccountData, ContractData, ContractForm } = newContextComponents

const DrizzleForm = ({ drizzle, drizzleState, initialized, method, children, ipfsHash, price, setPublishOpen }) => {
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
							let value = input.name === '_source' ? ipfsHash : state[input.name]

							if (method === 'purchaseBook' && input.name === '_price') {
								value = price
							}

							return (
								<TextField
									variant='outlined'
									color='secondary'
									fullWidth
									className={classes.textField}
									key={input.name}
									type={inputTypes[index]}
									name={input.name}
									value={value}
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
	formContainer: {
		width: '100%',
		height: '100%',
		paddingTop: '10%',
	},
	formBody: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	textField: {
		marginTop: '15px',
		marginBottom: '15px',
		'& input': {
			// color: '#e4e4e4',
		},
	},
}))
