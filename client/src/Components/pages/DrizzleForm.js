import React from 'react'
import { newContextComponents } from '@drizzle/react-components'
import { DrizzleContext } from '@drizzle/react-plugin'
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core'

const { AccountData, ContractData, ContractForm } = newContextComponents

const DrizzleForm = ({ drizzle, drizzleState, initialized, method, children }) => {
	const classes = useStyles()

	if (!initialized) {
		return 'Loading...'
	}

	const { accounts } = drizzleState

	return (
		<Container maxWidth="sm" className={classes.formContainer}>
			{children}

			<ContractForm
				drizzle={drizzle}
				drizzleState={drizzleState}
				contract='EBookStorage'
				method={method}
				labels={['IPFS Hash', 'Title', 'Price']}
				render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
					<form onSubmit={handleSubmit}>
						{inputs.map((input, index) => (
							<input
								style={{ fontSize: 30 }}
								key={input.name}
								type={inputTypes[index]}
								name={input.name}
								value={state[input.name]}
								placeholder={input.name}
								onChange={handleInputChange}
							/>
						))} 
						<button
							key='submit'
							type='button'
							onClick={handleSubmit}
							style={{ fontSize: 30 }}>
							Submit
						</button>
					</form>
				)}
			/>
		</Container>
	)
}

export default DrizzleForm

const useStyles = makeStyles(theme => ({
	
}))

