import React from 'react'
import { newContextComponents } from '@drizzle/react-components'
import { DrizzleContext } from '@drizzle/react-plugin'

const { AccountData, ContractData, ContractForm } = newContextComponents

const FormPage = ({ drizzle, drizzleState, initialized, method, children }) => {
	if (!initialized) {
		return 'Loading...'
	}

	const { accounts } = drizzleState

	return (
		<div className='uploadForm'>
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
		</div>
	)
}

export default FormPage
