import { app, sequelize } from '../express'
import request from 'supertest'

describe('e2e test for product', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  it('should create a product', async () => {
    const response = await request(app)
      .post('/products')
      .send({
        name: 'Keycron',
        description: 'Teclado mecanico',
        purchasePrice: 100,
        stock: 10
      })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('Keycron')
    expect(response.body.description).toBe('Teclado mecanico')
    expect(response.body.purchasePrice).toBe(100)
    expect(response.body.stock).toBe(10)
  })
})
