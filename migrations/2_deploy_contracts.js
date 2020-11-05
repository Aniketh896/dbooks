const DBookToken = artifacts.require('DBookToken')
const EbookStorage = artifacts.require('EbookStorage')

module.exports = async function (deployer, network, accounts) {
	const [author1, author2, client1, client2, ...others] = accounts

	await deployer.deploy(DBookToken)
	const DBKT = await DBookToken.deployed()
	console.log('Deployed DBookToken', DBookToken.address)

	await deployer.deploy(EbookStorage, DBKT.address)
	const EBStorage = await EbookStorage.deployed()
	console.log('Deployed EbookStorage', EBStorage.address)

	if (network === 'develop') {
		await DBKT.faucet(client1, web3.utils.toWei('10000'))
		await DBKT.faucet(client2, web3.utils.toWei('10000'))
		await DBKT.increaseAllowance(EBStorage.address, web3.utils.toWei('1000000'), { from: client1 })
		await DBKT.increaseAllowance(EBStorage.address, web3.utils.toWei('1000000'), { from: client2 })
	}

}
