import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'
import { ProductGateway } from '../gateway/product.gateway'
import ProductStoreModel from './product.model'

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductStoreModel.findAll()

    return products.map(({ dataValues: product }) => {
      return new Product({
        id: new Id(product.id),
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      })
    })
  }

  async find(id: string): Promise<Product> {
    const { dataValues: product } = await ProductStoreModel.findOne({
      where: { id }
    })

    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
  }
}
