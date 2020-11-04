const DBookToken = artifacts.require('DBookToken')

require('chai').use(require('chai-as-promised')).should()

contract('DBookToken', accounts => {
	describe('Deployment [DBookToken]', () => {
		const _name = 'DBookToken'
		const _symbol = 'DBKT'

		beforeEach(async () => {
			this.token = await DBookToken.new()
		})

		it('has a valid address ', async () => {
			this.token.address.should.not.equal('')
		})

		it('has the correct name ', async () => {
			const name = await this.token.name()
			name.should.equal(_name)
		})

		it('has the correct symbol ', async () => {
			const symbol = await this.token.symbol()
			symbol.should.equal(_symbol)
		})
	})
})
