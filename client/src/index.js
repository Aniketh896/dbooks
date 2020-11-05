import React from 'react';
import ReactDOM from 'react-dom';
import { DrizzleContext } from '@drizzle/react-plugin'
// import { drizzleConnect } from 'drizzle-react'
import { Drizzle } from '@drizzle/store'


// this.web3.eth.getAccounts()
// .then((accounts) => {
//   this.account = accounts[0];
// })

// // May still need this even with data function to refresh component on updates for this contract.
// const mapStateToProps = state => {
//   return {
// 	accounts: t,
// 	...state
//   }
// }

// const AppContainer = drizzleConnect(AppWrapper, mapStateToProps);

import App from './App';
import drizzleOptions from './drizzleOptions'
import * as serviceWorker from './serviceWorker'
import './index.css';

const drizzle = new Drizzle(drizzleOptions)

const AppWrapper = () => (
	<DrizzleContext.Provider drizzle={drizzle}>
		<DrizzleContext.Consumer>
			{drizzleContext => {
				const { drizzle, drizzleState, initialized } = drizzleContext

				return (
					<App drizzle={drizzle} drizzleState={drizzleState} initialized={initialized} />
				)
			}}
		</DrizzleContext.Consumer>
	</DrizzleContext.Provider>
)

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
