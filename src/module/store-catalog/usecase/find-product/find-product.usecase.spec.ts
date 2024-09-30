import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import FindProductsUsecase from './find-product.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn()
  }
}

describe('find a product usecase unit test', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductsUsecase(productRepository)

    const input = {
      id: '1'
    }

    const result = await usecase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.id).toBe('1')
  })
})
