const DBookToken = artifacts.require('DBookToken')
const EbookStorage = artifacts.require('EbookStorage')

module.exports = function (deployer) {
	deployer.deploy(DBookToken).then(token => {
		console.log('Deployed DBookToken', DBookToken.address)

		deployer.deploy(EbookStorage, DBookToken.address).then(estorage => {
			console.log('Deployed EbookStorage', EbookStorage.address)
		})
	})
}
