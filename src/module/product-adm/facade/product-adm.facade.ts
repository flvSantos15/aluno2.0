import { UseCaseInterface } from '../../@shared/usecase/use-case.interface'
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto
} from './product-adm.facade.interfce'

export interface UseCaseProps {
  addUsecase: UseCaseInterface
  stockUsecase: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUsecase: UseCaseInterface
  private _checkStockUsecase: UseCaseInterface

  constructor(usecaseProps: UseCaseProps) {
    this._addUsecase = usecaseProps.addUsecase
    this._checkStockUsecase = usecaseProps.stockUsecase
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    return this._addUsecase.execute(input)
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    return this._checkStockUsecase.execute(input)
  }
}
