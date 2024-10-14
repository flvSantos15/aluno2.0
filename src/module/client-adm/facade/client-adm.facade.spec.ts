import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client.model'
import ClientRepository from '../repository/client.repository'
import { AddClientUsecase } from '../usecase/add-client/add-client.usecase'
import ClientAdmFacade from './client-adm.facade'

describe('ClientAdmFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([ClientModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const repository = new ClientRepository()
    const addUsecase = new AddClientUsecase(repository)
    const facace = new ClientAdmFacade({
      addUsecase: addUsecase,
      findUsecase: undefined
    })

    const input = {
      id: '1',
      name: 'Client 1',
      email: 'x@email.com',
      address: 'Address 1'
    }

    await facace.add(input)

    const client = await ClientModel.findOne({ where: { id: '1' } })

    expect(client).toBeDefined()
    expect(client.name).toBe(input.name)
  })
})
