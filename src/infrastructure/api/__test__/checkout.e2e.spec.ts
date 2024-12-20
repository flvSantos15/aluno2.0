import { app, sequelize } from '../express'
import request from 'supertest'

describe('e2e test for checkout', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })
  
  it('should create a checkout', async () => {
    const response = await request(app)
      .post('/checkout/')
      .send({
        amount: 100,
        orderId: '123'
      })

    expect(response.status).toBe(200)
    expect(response.body.amount).toBe(100)
    expect(response.body.orderId).toBe('123')
  })
})
