import { app, sequelize } from '../express'
import request from 'supertest'

describe('e2e test for client', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const response = await request(app).post('/clients').send({
      name: 'John',
      email: 'John@j.com',
      document: '123456789'
    })

    expect(response.status).toBe(200)
    expect(response.body.name).toBe('John')
    expect(response.body.email).toBe('John@j.com')
    expect(response.body.document).toBe('123456789')
  })
})
