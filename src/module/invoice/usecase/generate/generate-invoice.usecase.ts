import Address from '../../../@shared/domain/value-object/address'
import Id from '../../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../../domain/invoice-items.entity'
import Invoice from '../../domain/invoice.entity'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  GenerateInvoiceUseCaseInputDto,
  GenerateInvoiceUseCaseOutputDto
} from './generate-invoice.dto'

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway

  constructor(_productRepository: InvoiceGateway) {
    this._invoiceRepository = _productRepository
  }

  async execute(
    input: GenerateInvoiceUseCaseInputDto
  ): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address(
      input.street,
      input.number,
      input.complement,
      input.city,
      input.state,
      input.zipCode
    )

    const invoiceItems = input.items.map(
      (item: { id: string; name: string; price: number }) => {
        const invoiceItem = new InvoiceItems({
          id: new Id(item.id),
          name: item.name,
          price: item.price
        })

        return invoiceItem
      }
    )

    const props = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address,
      items: invoiceItems,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const invoice = new Invoice(props)
    this._invoiceRepository.generate(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipcode,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      }))
    }
  }
}
