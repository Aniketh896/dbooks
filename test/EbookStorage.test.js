const { assert } = require('chai')

const DBookToken = artifacts.require('DBookToken')
const EbookStorage = artifacts.require('EbookStorage')

require('chai').use(require('chai-as-promised')).should()

contract('EbookStorage', accounts => {
	const [author1, author2, client1, client2, ...others] = accounts

	const _source1 = 'QxSdisoUDoasduoagdlhagd'
	const _source2 = 'QxSdisoUDoasdsuoagdlhagd'


	before(async () => {
		this.DBookTokenInstance = await DBookToken.deployed()
		this.EbookStorageInstance = await EbookStorage.deployed()
	})

	describe('Deployment [EbookStorage]', () => {
		it('Deployed Successfully ', async () => {
			this.DBookTokenInstance.address.should.not.equal('')
			this.DBookTokenInstance.address.should.not.equal(0x0)
			this.DBookTokenInstance.address.should.not.equal(null)
			this.DBookTokenInstance.address.should.not.equal(undefined)
			
			this.EbookStorageInstance.address.should.not.equal('')
			this.EbookStorageInstance.address.should.not.equal(0x0)
			this.EbookStorageInstance.address.should.not.equal(null)
			this.EbookStorageInstance.address.should.not.equal(undefined)
		})
	})

	describe('Publish books', () => {
		it('should publish new book successfully', async () => {
			await this.EbookStorageInstance.publishBook(_source1, { from: author1 })
			this.EbookStorageInstance.ebookSource(author1, 0).should.eventually.equal(_source1)

			assert.equal(await this.EbookStorageInstance.authorOf(_source1), author1)
		})

		it('should not publish the same book', async () => {
			this.EbookStorageInstance.publishBook(_source1, {
				from: author1,
			}).should.be.rejectedWith('Book is already issued')
		})

		it('should not publish issued book', async () => {
			this.EbookStorageInstance.publishBook(_source1, {
				from: author2,
			}).should.be.rejectedWith('Book is already issued')
		})

		it('should have the right ebook count', async () => {
			await this.EbookStorageInstance.publishBook(_source2, { from: author1 })

			assert.equal(await this.EbookStorageInstance.ebookCount(author1), 2)
		})

		it('should purchase a book successfully', async () => {
			await this.EbookStorageInstance.purchaseBook(author1, _source1, web3.utils.toWei('10000'), {
				from: client1,
			})

			assert.equal(await this.EbookStorageInstance.clientLib(client1, 0), _source1)
		})
	})

		
})
