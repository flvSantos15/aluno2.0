import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from './product.model'
import Product from '../domain/product.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import ProductRepository from './product.repository'

describe('Product repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: false }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const productProps = {
      id: new Id('1'),
      name: 'Product 1',
      description: 'product 1 description',
      purchasePrice: 100,
      stock: 10
    }
    const product = new Product(productProps)
    const productRepository = new ProductRepository()
    await productRepository.add(product)

    const { dataValues: result } = await ProductModel.findOne({
      where: { id: '1' }
    })

    expect(result.id.id).toEqual('1')
    expect(result.name).toEqual('Product 1')
    expect(result.description).toEqual('product 1 description')
    expect(result.purchasePrice).toEqual(100)
    expect(result.stock).toEqual(10)
  })

  it('should find a product', async () => {
    const productRepository = new ProductRepository()

    const id = new Id('1')

    await ProductModel.create({
      id: id.id,
      name: 'Product 1',
      description: 'product 1 description',
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const product = await productRepository.find('1')

    expect(product.id.id).toEqual('1')
    expect(product.name).toEqual('Product 1')
    expect(product.description).toEqual('product 1 description')
    expect(product.purchasePrice).toEqual(100)
    expect(product.stock).toEqual(10)
  })
})
