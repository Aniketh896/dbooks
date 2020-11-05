import Web3 from 'web3'
import Portis from '@portis/web3'

import EBookStorage from './contracts/EBookStorage.json'
import DBookToken from './contracts/DBookToken.json'

const localNode = {
	nodeUrl: 'http://127.0.0.1:8545/',
}

export const portis = new Portis('335b9cd6-cb46-4c1c-a7e4-cc529f269bc1', 'maticMumbai', { scope: ['email', 'reputation'] })
// export const portis = new Portis('335b9cd6-cb46-4c1c-a7e4-cc529f269bc1', localNode, { scope: ['email', 'reputation'] })

const options = {
	web3: {
		block: false,
		customProvider: new Web3(portis.provider),
	},
	contracts: [EBookStorage, DBookToken],
	events: {
		EBookStorage: ['publishedBookEvent', 'purchasedBookEvent'],
	},
}

export default options
