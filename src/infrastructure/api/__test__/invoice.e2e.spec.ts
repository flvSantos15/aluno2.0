import { app, sequelize } from '../express'
import request from 'supertest'
import InvoiceModel from '../../../module/invoice/repository/invoice.model'
import InvoiceItemModel from '../../../module/invoice/repository/invoice-items.model'

describe('e2e test for invoice', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  it('should get a invoice', async () => {
    // Create test data
    const { dataValues: invoice } = await InvoiceModel.create({
      id: '1',
      name: 'Test Invoice',
      document: '123456789',
      street: 'Test Street',
      number: '123',
      complement: 'Test Complement',
      city: 'Test City',
      state: 'TS',
      zipcode: '12345-678',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    // Create invoice items
    await InvoiceItemModel.create({
      id: '1',
      invoice_id: invoice.id,
      name: 'Test Item',
      price: 100
    })

    const response = await request(app)
      .get('/invoice/1')
    
    expect(response.status).toBe(200)
    expect(response.body.id).toBe(invoice.id)
    expect(response.body.name).toBe(invoice.name)
    expect(response.body.document).toBe(invoice.document)
    expect(response.body.street).toBe(invoice.street)
    expect(response.body.number).toBe(invoice.number)
    expect(response.body.complement).toBe(invoice.complement)
    expect(response.body.city).toBe(invoice.city)
    expect(response.body.state).toBe(invoice.state)
    expect(response.body.zipcode).toBe(invoice.zipcode)
    expect(response.body.items).toBeDefined()
    expect(response.body.items).toHaveLength(1)
    expect(response.body.items[0].id).toBe('1')
    expect(response.body.items[0].name).toBe('Test Item')
    expect(response.body.items[0].price).toBe(100)
  })
})
