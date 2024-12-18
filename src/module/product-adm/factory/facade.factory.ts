import ProductAdmFacade from '../facade/product-adm.facade'
import ProductRepository from '../repository/product.repository'
import AddProductUseCase from '../usecase/add-product/add-product.usecase'
import CheckStockUsecase from '../usecase/check-stock/check-stock.usecase'

export default class ProductAdmFacadeFactory {
  static create() {
    const productRepository = new ProductRepository()

    const addProductUseCase = new AddProductUseCase(productRepository)
    const checkStockUseCase = new CheckStockUsecase(productRepository)

    const productFacade = new ProductAdmFacade({
      addUsecase: addProductUseCase,
      stockUsecase: checkStockUseCase
    })

    return productFacade
  }
}
