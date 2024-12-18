import Id from '../../../@shared/domain/value-object/id.value-object'
import Transaction from '../../domain/transaction'
import ProcessPaymentUseCase from './process-payment.usecase'

const transcation = new Transaction({
  id: new Id('1'),
  amount: 100,
  orderId: '1',
  status: 'approved'
})

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transcation))
  }
}

const transcation2 = new Transaction({
  id: new Id('1'),
  amount: 50,
  orderId: '1',
  status: 'declined'
})

const MockRepositoryDecline = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transcation2))
  }
}

describe('Process payment usecase unit test', () => {
  it('should approve a transaction', async () => {
    const repository = MockRepository()
    const usecase = new ProcessPaymentUseCase(repository)
    const input = {
      orderId: '1',
      amount: 100
    }

    const result = await usecase.execute(input)

    expect(result.transactionId).toBe(transcation.id.id)
    expect(repository.save).toHaveBeenCalled()
    expect(result.status).toBe('approved')
    expect(result.amount).toBe(100)
  })

  it('should decline a transaction', async () => {
    const repository = MockRepositoryDecline()
    const usecase = new ProcessPaymentUseCase(repository)
    const input = {
      orderId: '1',
      amount: 50
    }

    const result = await usecase.execute(input)

    expect(result.transactionId).toBe(transcation2.id.id)
    expect(repository.save).toHaveBeenCalled()
    expect(result.status).toBe('declined')
    expect(result.amount).toBe(50)
  })
})
