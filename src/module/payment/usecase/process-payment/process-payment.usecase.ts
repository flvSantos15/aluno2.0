import { UseCaseInterface } from '../../../@shared/usecase/use-case.interface'
import Transaction from '../../domain/transaction'
import { PaymentGateway } from '../../gateway/payment.gateway'
import {
  ProcessPaymentInputDto,
  ProcessPaymentOututDto
} from './process-payment.dto'

export default class ProcessPaymentUseCase implements UseCaseInterface {
  constructor(private transactionRepository: PaymentGateway) {}

  async execute(
    input: ProcessPaymentInputDto
  ): Promise<ProcessPaymentOututDto> {
    const transaction = new Transaction({
      amount: input.amount,
      orderId: input.orderId
    })

    transaction.process()

    const persistTransaction = await this.transactionRepository.save(
      transaction
    )

    return {
      transactionId: persistTransaction.id.id,
      orderId: persistTransaction.orderId,
      amount: persistTransaction.amount,
      status: transaction.status,
      createdAt: persistTransaction.createdAt,
      updatedAt: persistTransaction.updatedAt
    }
  }
}