const { assert } = require('chai')

const DBookToken = artifacts.require('DBookToken')
const EBookStorage = artifacts.require('EBookStorage')

require('chai').use(require('chai-as-promised')).should()

contract('EBookStorage', accounts => {
	const [author1, author2, client1, client2, ...others] = accounts

	const _source1 = 'QxSdisoUDoasduoagdlhagd'
	const _title1 = 'Title 1'
	const _price1 = web3.utils.toWei('100')

	const _source2 = 'QxSdisoUDoasdsuoagdlhagd'
	const _title2 = 'Title 2'
	const _price2 = web3.utils.toWei('100')

	before(async () => {
		this.DBookTokenInstance = await DBookToken.deployed()
		this.EBookStorageInstance = await EBookStorage.deployed()
	})

	describe('Deployment [EbookStorage]', () => {
		it('Deployed Successfully ', async () => {
			this.DBookTokenInstance.address.should.not.equal('')
			this.DBookTokenInstance.address.should.not.equal(0x0)
			this.DBookTokenInstance.address.should.not.equal(null)
			this.DBookTokenInstance.address.should.not.equal(undefined)

			this.EBookStorageInstance.address.should.not.equal('')
			this.EBookStorageInstance.address.should.not.equal(0x0)
			this.EBookStorageInstance.address.should.not.equal(null)
			this.EBookStorageInstance.address.should.not.equal(undefined)
		})
	})

	describe('Publish books', () => {
		it('should publish new book successfully', async () => {
			await this.EBookStorageInstance.publishBook(_source1, _title1, _price1, {
				from: author1,
			})
			const ebookPublished = await this.EBookStorageInstance.ebookSource(author1, 0)
			assert.equal(ebookPublished[0], _title1)
			assert.equal(ebookPublished[1], _source1)
			assert.equal(ebookPublished[2], _price1)

			assert.equal(await this.EBookStorageInstance.authorOf(_source1), author1)
			assert.equal(await this.EBookStorageInstance.sourceToTitle(_source1), _title1)
			assert.equal(await this.EBookStorageInstance.sourceToPrice(_source1), _price1)
		})

		it('should fail to publish the same book', async () => {
			this.EBookStorageInstance.publishBook(_source1, _title1, _price1, {
				from: author1,
			}).should.be.rejectedWith('Book is already issued')
		})

		it('should fail to publish issued book', async () => {
			this.EBookStorageInstance.publishBook(_source1, _title1, _price1, {
				from: author2,
			}).should.be.rejectedWith('Book is already issued')
		})

		it('should have the correct ebook count', async () => {
			await this.EBookStorageInstance.publishBook(_source2, _title2, _price2, {
				from: author1,
			})

			assert.equal(await this.EBookStorageInstance.ebookCount(author1), 2)
		})
	})

	describe('Should purchase books successfully', () => {
		it('should purchase a book successfully', async () => {
			await this.EBookStorageInstance.purchaseBook(
				author1,
				_source1,
				web3.utils.toWei('100'),
				{
					from: client1,
				}
			)

			const ebookPurchased = await this.EBookStorageInstance.clientLib(client1, 0)
			assert.equal(ebookPurchased[0], _title1)
			assert.equal(ebookPurchased[1], _source1)
			assert.equal(ebookPurchased[2], _price1)

			assert.equal(await this.EBookStorageInstance.clientLibCount(client1), 1)
			assert(await this.EBookStorageInstance.isEbookOwned(client1, _source1))
		})

		it('should fail to purchase the same book again', async () => {
			this.EBookStorageInstance.purchaseBook(author1, _source1, web3.utils.toWei('10000'), {
				from: client1,
			}).should.be.rejectedWith('You already own the ebook')
		})

		it('should fail to purchase a non issued book', async () => {
			this.EBookStorageInstance.purchaseBook(author2, _source1, web3.utils.toWei('10000'), {
				from: client1,
			}).should.be.rejectedWith('Author has not issued that ebook')
		})

		// it('should fail to purchase a book due to insufficient funds', async () => {
		// 	this.EbookStorageInstance.purchaseBook(author2, _source1, web3.utils.toWei('10000'), {
		// 		from: client1,
		// 	}).should.be.rejectedWith('Author has not issued that ebook')
		// })
	})
})
