import FindAllProductsUsecase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUsecase from '../usecase/find-product/find-product.usecase'
import {
  FindAllStoreCatalogFacadeOututDto,
  FindStoreCatalogFacadeInputDto,
  FindStoreCatalogFacadeOututDto,
  IStoreCatalogFacade
} from './store-catalog.facade.interface'

interface UseCaseProps {
  findUsecase: FindProductUsecase
  findAllUsecase: FindAllProductsUsecase
}

export class StoreCatalogFacade implements IStoreCatalogFacade {
  private _findUsecase: FindProductUsecase
  private _findAllUsecase: FindAllProductsUsecase

  constructor(props: UseCaseProps) {
    this._findUsecase = props.findUsecase
    this._findAllUsecase = props.findAllUsecase
  }

  async find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOututDto> {
    return await this._findUsecase.execute(id)
  }

  async findAll(): Promise<FindAllStoreCatalogFacadeOututDto> {
    return await this._findAllUsecase.execute()
  }
}
