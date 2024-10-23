import { Sequelize } from 'sequelize-typescript'
import TransactionModel from './transaction.model'
import Transaction from '../domain/transaction'
import Id from '../../@shared/domain/value-object/id.value-object'
import TransactionRepository from './transation.repository'

describe('TransactionRepository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    await sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should save a transaction', async () => {
    const transaction = new Transaction({
      id: new Id(''),
      amount: 100,
      orderId: '1'
    })

    transaction.approve()

    const repository = new TransactionRepository()
    const result = await repository.save(transaction)

    expect(result.id.id).toBe(transaction.id.id)
    expect(result.status).toBe('approved')
  })
})
