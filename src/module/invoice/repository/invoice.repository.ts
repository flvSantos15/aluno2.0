import Address from '../../@shared/domain/value-object/address'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../domain/invoice-items.entity'
import Invoice from '../domain/invoice.entity'
import InvoiceGateway from '../gateway/invoice.gateway'
import InvoiceItemModel from './invoice-items.model'
import InvoiceModel from './invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async generate(invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipcode: invoice.address.zipcode,
      items: invoice.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price
      })),
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  async find(id: string): Promise<Invoice> {
    const { dataValues: invoice } = await InvoiceModel.findOne({
      where: { id },
      include: ['items']
    })

    if (!invoice) {
      throw new Error(`Invoice with id ${id} not found.`)
    }

    const address = new Address(
      invoice.street,
      invoice.number,
      invoice.complement,
      invoice.city,
      invoice.state,
      invoice.zipcode
    )

    console.log('invoice', invoice)

    const invoiceItems = invoice.items.map(
      (item: { id: Id; name: string; price: number }) => {
        const invoiceItem = new InvoiceItems({
          id: item.id,
          name: item.name,
          price: item.price
        })

        return invoiceItem
      }
    )

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address,
      items: invoiceItems,
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt
    })
  }
}