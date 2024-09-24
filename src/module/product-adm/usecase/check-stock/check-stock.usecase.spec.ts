import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import CheckStockUsecase from './check-stock.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product',
  description: 'Product description',
  purchasePrice: 100,
  stock: 10
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}

describe('CheckStock usecase test', () => {
  it('should get stock of a product', async () => {
    const repository = MockRepository()
    const checkStockUsecase = new CheckStockUsecase(repository)
    const input = {
      productId: '1'
    }

    const result = await checkStockUsecase.execute(input)

    expect(repository.find).toHaveBeenCalled()
    expect(result.productId).toBe('1')
    expect(result.stock).toBe(10)
  })
})
