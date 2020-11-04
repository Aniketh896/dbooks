const path = require('path')

const mnemonic =
	'wood crawl example plug artefact private myself tomato start convince network beyond'

module.exports = {
	contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
	networks: {
		develop: {
			host: '127.0.0.1',
			port: 8545,
			network_id: '*',
		},
		matic: {
			provider: () => new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
			network_id: 80001,
			confirmations: 2,
			timeoutBlocks: 200,
			skipDryRun: true,
		},
	},
	compilers: {
		solc: {
			version: '^0.6.0',
			parser: 'solcjs',
			settings: {
				optimizer: {
					enabled: true,
					runs: 200,
				},
			},
		},
	},
}
