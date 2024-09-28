import { Sequelize } from 'sequelize-typescript'
import ProductModel from './product.model'
import ProductRepository from './product.repository'
import Id from '../../@shared/domain/value-object/id.value-object'

describe('ProductRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  const id1 = new Id('1')
  const id2 = new Id('2')

  it('should find all products', async () => {
    await ProductModel.create({
      id: id1.id,
      name: 'Product 1',
      description: 'Description 1',
      salesPrice: 100
    })

    await ProductModel.create({
      id: id2.id,
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
})
