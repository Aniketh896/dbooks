import Web3 from 'web3'
import Portis from '@portis/web3'

const portis = new Portis('335b9cd6-cb46-4c1c-a7e4-cc529f269bc1', 'mainnet')

const options = {
	web3: {
		block: false,
		customProvider: new Web3(portis.provider),
	},
	contracts: [],
	events: {},
}

export default options
