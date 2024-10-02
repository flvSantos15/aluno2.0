import { ProductGateway } from '../../gateway/product.gateway'
import { FindProductInputDto, FindProductOutputDto } from './find-product.dto'

export default class FindProductUsecase {
  constructor(private productRepository: ProductGateway) {
    this.productRepository = productRepository
  }

  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}
