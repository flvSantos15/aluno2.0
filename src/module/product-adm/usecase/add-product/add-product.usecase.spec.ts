import AddProductUseCase from './add-product.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Product usecase unit test', () => {
  it('should add a product', async () => {
    // repository
    const productRepository = MockRepository()
    // usecase
    const usecase = new AddProductUseCase(productRepository)

    // input
    const input = {
      name: 'Product 1',
      description: 'Product description',
      purchasePrice: 100,
      stock: 10
    }

    usecase.execute(input)
    // output
  })
})
