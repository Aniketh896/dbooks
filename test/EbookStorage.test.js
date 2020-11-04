const DBookToken = artifacts.require('DBookToken')
const EbookStorage = artifacts.require('EbookStorage')

require('chai').use(require('chai-as-promised')).should()

contract('EbookStorage', accounts => {
	const [author1, author2, client1, client2, ...others] = accounts
	const _source1 = 'QxSdisoUDoasduoagdlhagd'
	const _source2 = 'QxSdisoUDoasdsuoagdlhagd'

	before(async () => {
		this.DBookTokenInstance = await DBookToken.new()
		this.EbookStorageInstance = await EbookStorage.new(this.DBookTokenInstance.address)
	})

	describe('Deployment [EbookStorage]', () => {
		it('Deployed Successfully ', async () => {
			this.DBookTokenInstance.address.should.not.equal('')
			this.EbookStorageInstance.address.should.not.equal('')
		})
	})

	describe('Publish books', () => {
		it('should publish new book successfully', async () => {
			await this.EbookStorageInstance.publishBook(_source1, { from: author1 })
			this.EbookStorageInstance.ebookSource(author1, 0).should.eventually.equal(_source1)
			this.EbookStorageInstance.authorOf(_source1).should.eventually.equal(author1)
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

			this.EbookStorageInstance.ebookCount(author1).should.eventually.equal(2)
		})
	})

	describe('Purchase book', () => {
		it('should purchase a book successfully', async () => {
			await this.EbookStorageInstance.purchaseBook(author1, _source1, {
				from: client1,
				value: web3.utils.toWei('1', 'Ether'),
			})
			this.EbookStorageInstance.clientLib(client1, 0).should.eventually.equal(_source1)
		})
	})
})
