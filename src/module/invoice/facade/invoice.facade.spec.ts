import { Sequelize } from 'sequelize-typescript'
import InvoiceModel from '../repository/invoice.model'
import InvoiceItemModel from '../repository/invoice-items.model'
import InvoiceRepository from '../repository/invoice.repository'
import GenerateInvoiceUseCase from '../usecase/generate/generate-invoice.usecase'
import InvoiceFacade from './invoice.facade'
import Address from '../../@shared/domain/value-object/address'
import Id from '../../@shared/domain/value-object/id.value-object'
import InvoiceItems from '../domain/invoice-items.entity'
// import ProductAdmFacadeFactory from '../factory/facade.factory'

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
    // TODO: The problem should be here
    const repository = new InvoiceRepository()
    // TODO: Esses dois debaixo foram testados e estao ok
    const useCase = new GenerateInvoiceUseCase(repository)
    const facade = new InvoiceFacade({
      generate: useCase,
      find: undefined
    })

    // const productFacade = ProductAdmFacadeFactory.create()

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
      id: id.id,
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
      zipCode: address.zipcode
    }

    await facade.generate(input)

    // TODO: Item was not created
    const { dataValues: invoice } = await InvoiceModel.findOne({
      where: { id: '1' },
      include: {
        model: InvoiceItemModel
      }
    })

    // TODO Em algum lugar o item n ta sendo criado
    console.log('invoice', invoice)

    expect(invoice).toBeDefined()
    expect(invoice.id).toBe(input.id)
    expect(invoice.name).toBe(input.name)
    expect(invoice.items[0].name).toBe(input.items[0].name)
    expect(invoice.document).toBe(input.document)
    expect(invoice.street).toBe(input.street)
  })

  // it('should check product stock', async () => {
  //   const productFacade = ProductAdmFacadeFactory.create()

  //   const input = {
  //     id: '1',
  //     name: 'Product 1',
  //     description: 'Product 1 description',
  //     purchasePrice: 10,
  //     stock: 10
  //   }

  //   await productFacade.addProduct(input)

  //   const result = await productFacade.checkStock({ productId: '1' })

  //   expect(result.productId).toBe(input.id)
  //   expect(result.stock).toBe(input.stock)
  // })
})
