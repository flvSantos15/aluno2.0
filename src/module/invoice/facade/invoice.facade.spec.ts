import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from '../repository/invoice.model'
import InvoiceItemModel from '../repository/invoice-items.model'
import InvoiceRepository from '../repository/invoice.repository'
import GenerateInvoiceUseCase from '../usecase/generate/generate-invoice.usecase'
import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase'
import InvoiceFacade from './invoice.facade'
import Address from '../../@shared/domain/value-object/address'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceFacadeFactory from '../factory/facade.factory'

describe('InvoiceFacade test', () => {
  let sequelize: Sequelize

  beforeAll(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([InvoiceModel, InvoiceItemModel])
    await sequelize.sync()
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a invoice', async () => {
    // const repository = new InvoiceRepository()

    // const useCase = new GenerateInvoiceUseCase(repository)
    // const facade = new InvoiceFacade({
    //   generate: useCase,
    //   find: undefined
    // })

    const facade = InvoiceFacadeFactory.create()

    const address = new Address(
      'Street 1',
      '123',
      'Complemento',
      'City 1',
      'state 1',
      'zipcode 1'
    )

    const id = new Id('1')

    const invoiceItem = {
      id: '1',
      name: 'Item 1 - teste do map',
      price: 100
    }

    const input = {
      id: '1',
      name: 'Invoice 1',
      document: '12345678',
      items: [invoiceItem],
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode
    }

    await facade.generate(input)

    const { dataValues: invoice } = await InvoiceModel.findOne({
      where: { id: '1' },
      include: {
        model: InvoiceItemModel
      }
    })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(input.id)
    expect(invoice.name).toBe(input.name)
    expect(invoice.items[0].name).toBe(input.items[0].name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.street).toBe(input.street)
  })

  it('should find a invoice', async () => {
    const repository = new InvoiceRepository()

    const generateUseCase = new GenerateInvoiceUseCase(repository)
    const useCase = new FindInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generate: generateUseCase,
      find: useCase
    })

    // const facade = InvoiceFacadeFactory.create()

    const address = new Address(
      'Street 1',
      '123',
      'Complemento',
      'City 1',
      'state 1',
      'zipcode 1'
    )

    const id = new Id('1')

    const invoiceItem = {
      id: '2',
      name: 'Item 2 - teste do find invoice',
      price: 100
    }

    const invoiceData = {
      id: '2',
      name: 'Invoice 2',
      document: '12345678',
      items: [invoiceItem],
      street: address.street,
      number: address.number,
      complement: address.complement,
      city: address.city,
      state: address.state,
      zipcode: address.zipcode
    }

    await facade.generate(invoiceData)

    const input = {
      id: '2'
    }

    await facade.find(input)

    const invoice = await facade.find({ id: '2' })

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(input.id)
    expect(invoice.name).toBe('Invoice 2')
    expect(invoice.items[0].name).toBe('Item 2 - teste do find invoice')
    expect(invoice.document).toBe('12345678')
    expect(invoice.address.street).toBe('Street 1')
  })
})
