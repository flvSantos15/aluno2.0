import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from './client.model'
import ClientRepository from './client.repository'
import { Client } from '../domain/client.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

describe('ClientRepository teste', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: false }
    })

    await sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const client = new Client({
      id: new Id('1'),
      name: 'Client 1',
      email: 'x@.com',
      document: '1234-5678'
    })

    const reporitory = new ClientRepository()
    await reporitory.add(client)

    const { dataValues: clientDb } = await ClientModel.findOne({
      where: { id: '1' }
    })

    expect(clientDb.id).toEqual('1')
    expect(clientDb.name).toEqual(client.name)
    expect(clientDb.email).toEqual(client.email)
  })

  it('should find a client', async () => {
    const { dataValues: client } = await ClientModel.create({
      id: '1',
      name: 'Client 1',
      email: 'x@.com',
      document: '1234-5678',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const reporitory = new ClientRepository()
    const result = await reporitory.find('1')

    expect(result.id.id).toEqual('1')
    expect(result.name).toEqual(client.name)
    expect(result.email).toEqual(client.email)
  })
})
