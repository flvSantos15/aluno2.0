import ProductGateway from '../../gateway/product.gateway'
import { AddProductInputDto } from './add-product.dto'

export default class AddProductUseCase {
  constructor(repository: ProductGateway) {}

  async execute(input: AddProductInputDto) {}
}
