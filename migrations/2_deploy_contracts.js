const { deployProxy } = require('@openzeppelin/truffle-upgrades')

const ComplexStorage = artifacts.require('ComplexStorage')

module.exports = async function (deployer) {
	const instance = await deployProxy(ComplexStorage, [42], { deployer })
	console.log('Deployed', instance.address)
}
