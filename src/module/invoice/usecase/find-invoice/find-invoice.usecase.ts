import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../../domain/invoice-items.entity'
import Invoice from '../../domain/invoice.entity'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  FindInvoiceUseCaseInputDTO,
  FindInvoiceUseCaseOutputDTO
} from './find-invoice.dto'

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway

  constructor(findRepository: InvoiceGateway) {
    this._invoiceRepository = findRepository
  }

  async execute(
    input: FindInvoiceUseCaseInputDTO
  ): Promise<FindInvoiceUseCaseOutputDTO> {
    const result = await this._invoiceRepository.find(input.id)

    const address = new Address(
      result.address.street,
      result.address.number,
      result.address.complement,
      result.address.city,
      result.address.state,
      result.address.zipcode
    )

    const invoiceItems = result.items.map(
      (item: { id: Id; name: string; price: number }) => {
        const invoiceItem = new InvoiceItems({
          id: item.id,
          name: item.name,
          price: item.price
        })

        return invoiceItem
      }
    )

    const props = {
      id: new Id(input.id),
      name: result.name,
      document: result.document,
      address,
      items: invoiceItems,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const invoice = new Invoice(props)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: invoice.address,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      createdAt: invoice.createdAt
    }
  }
}
