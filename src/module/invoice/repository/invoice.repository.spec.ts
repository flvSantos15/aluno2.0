import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'
import Invoice from '../domain/invoice.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceRepository from './invoice.repository'
import Address from '../../@shared/domain/value-object/address'
import InvoiceItems from '../domain/invoice-items.entity'
import InvoiceItemModel from './invoice-items.model'

describe('Invoice repository test', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: false }
    })

    await sequelize.addModels([InvoiceItemModel, InvoiceModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a invoice', async () => {
    const address = new Address(
      'Street 1',
      '123',
      'Complemento',
      'City 1',
      'state 1',
      'zipcode 1'
    )

    const items = new InvoiceItems({
      id: new Id('1'),
      name: 'Item 1',
      price: 100
    })

    const invoiceProps = {
      id: new Id('1'),
      name: 'Invoice 1',
      document: '12345678',
      address: address,
      items: [items]
    }
    const invoice = new Invoice(invoiceProps)

    const repository = new InvoiceRepository()
    await repository.generate(invoice)

    const { dataValues: result } = await InvoiceModel.findOne({
      where: { id: '1' },
      include: {
        model: InvoiceItemModel
      }
    })

    expect(result.id).toEqual('1')
    expect(result.name).toEqual('Invoice 1')
    expect(result.document).toEqual('12345678')
    expect(result.items[0].name).toEqual('Item 1')
    expect(result.street).toEqual('Street 1')
  })

  it('should find a invoice', async () => {
    const repository = new InvoiceRepository()

    const id = new Id('2')

    const address = new Address(
      'Street 1',
      '123',
      'Complemento',
      'City 1',
      'state 1',
      'zipcode 1'
    )

    const item1 = new InvoiceItems({
      id: id,
      name: 'Item 1',
      price: 100
    })

    const invoice = new Invoice({
      id: id,
      name: 'Invoice 1',
      document: '12345678',
      items: [item1],
      address: address,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    await InvoiceModel.create(
      {
        id: invoice.id.id,
        name: invoice.name,
        document: invoice.document,
        items: [invoice.items],
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipcode: invoice.address.zipcode,
        createdAt: invoice.createdAt,
        updatedAt: invoice.updatedAt
      },
      {
        include: [{ model: InvoiceItemModel }]
      }
    )

    // await InvoiceItemModel.create({
    //   id: item1.id.id,
    //   name: item1.name,
    //   price: item1.price,
    //   invoice_id: invoice.id.id
    // })

    const result = await repository.find('2')

    expect(result.id.id).toEqual('2')
    expect(result.name).toEqual('Invoice 1')
    expect(result.document).toEqual('12345678')
    expect(result.items[0].name).toEqual('Item 1')
    expect(result.address.street).toEqual('Street 1')
  })
})
