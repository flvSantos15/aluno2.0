import { Sequelize } from 'sequelize-typescript'
import { ClientModel } from '../repository/client.model'
import ClientRepository from '../repository/client.repository'
import { AddClientUsecase } from '../usecase/add-client/add-client.usecase'
import ClientAdmFacade from './client-adm.facade'
import ClientAdmFacadeFactory from '../factory/client-adm.facade.factory'
import Address from '../../@shared/domain/value-object/address'

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
      document: '1234-5678',
      address: new Address(
        'Street 123',
        '99',
        'Casa 123',
        'Sao paulo',
        'SP',
        '99999-000'
      )
    }

    await facace.add(input)

    const { dataValues: client } = await ClientModel.findOne({
      where: { id: '1' }
    })

    expect(client).toBeDefined()
    expect(client.name).toBe(input.name)
  })

  it('should find a client', async () => {
    // const repository = new ClientRepository()
    // const findUsecase = new FindClientUsecase(repository)
    // const addUsecase = new AddClientUsecase(repository)
    // const facace = new ClientAdmFacade({
    //   addUsecase: addUsecase,
    //   findUsecase: findUsecase
    // })

    const facade = ClientAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Client 1',
      email: 'x@email.com',
      document: '1234-5678',
      address: new Address(
        'Street 123',
        '99',
        'Casa 123',
        'Sao paulo',
        'SP',
        '99999-000'
      )
    }

    await facade.add(input)

    const client = await facade.find({ id: '1' })

    expect(client).toBeDefined()
    expect(client.id).toBe(input.id)
    expect(client.name).toBe(input.name)
  })
})
