import React, { useState } from 'react'
import { newContextComponents } from '@drizzle/react-components'
import Forms from './pages/Forms'

const { AccountData, ContractData, ContractForm } = newContextComponents

export default function PublishBook({ drizzle, drizzleState, initialized }) {
	const [dbktBalance, setDbktBalance] = useState(0)

	if (!initialized) {
		return 'loading....'
	}

	return (
		<Forms
			method='publishBook'
			drizzle={drizzle}
			drizzleState={drizzleState}
			initialized={initialized}>
			<div>
				<h2>Current Active Account</h2>

				<AccountData
					drizzle={drizzle}
					drizzleState={drizzleState}
					accountIndex={0}
					units='ether'
					precision={3}
					render={({ address, balance, units }) => (
						<div>
							My Address: <span style={{ color: 'red' }}>{address}</span> <br />
							MATIC Token: <span style={{ color: 'red' }}>{balance}</span> {units}
							My DBKT: <span style={{ color: 'red' }}>{dbktBalance}</span> {units}
						</div>
					)}
				/>

				<h2>SimpleStorage</h2>
				<p>
					This shows a simple ContractData component with no arguments, along with a form
					to set its value.
				</p>
			</div>
		</Forms>
	)
}
