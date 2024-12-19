import { UseCaseInterface } from '../../@shared/usecase/use-case.interface'
import InvoiceFacadeInterface, {
  GenerateInvoiceFacadeInputDto,
  FindInvoiceFacadeInputDto,
  InvoiceFacadeOutputDto
} from './invoice.facade.interface'

export interface InvoiceUseCaseProps {
  generate: UseCaseInterface
  find: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generate: UseCaseInterface
  private _find: UseCaseInterface

  constructor(usecaseProps: InvoiceUseCaseProps) {
    this._generate = usecaseProps.generate
    this._find = usecaseProps.find
  }

  generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
    return this._generate.execute(input)
  }

  find(input: FindInvoiceFacadeInputDto): Promise<InvoiceFacadeOutputDto> {
    return this._find.execute(input)
  }
}
