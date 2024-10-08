import ProductGateway from '../../gateway/product.gateway'
import { CheckStockInputDto, CheckStockOutputDto } from './check-stock.dto'

export default class CheckStockUsecase {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
    this._productRepository = productRepository
  }

  async execute(input: CheckStockInputDto): Promise<CheckStockOutputDto> {
    const product = await this._productRepository.find(input.productId)

    return {
      productId: input.productId,
      stock: product.stock
    }
  }
}
