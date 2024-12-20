import { Sequelize } from 'sequelize-typescript'
import ProductStoreModel from './product.model'
import ProductRepository from './product.repository'

describe('ProductRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductStoreModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find all products', async () => {
    await ProductStoreModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })

    await ProductStoreModel.create({
      id: '2',
      name: 'Product 2',
      description: 'Description 2',
      salesPrice: 200
    })

    const productRepository = new ProductRepository()
    const products = await productRepository.findAll()

    expect(products.length).toBe(2)
    expect(products[0].id.id).toBe('1')
    expect(products[0].name).toBe('Product 1')
    expect(products[0].description).toBe('Description 1')
    expect(products[1].id.id).toBe('2')
    expect(products[1].name).toBe('Product 2')
    expect(products[1].description).toBe('Description 2')
  })

  it('should find a product', async () => {
    await ProductStoreModel.create({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })

    const repository = new ProductRepository()
    const product = await repository.find('1')

    expect(product.id.id).toBe('1')
  })
})
