import express, { Request, Response } from 'express'
import PaymentUseCase from '../../../module/payment/usecase/process-payment/process-payment.usecase'
import PaymentRepository from '../../../module/payment/repository/transation.repository'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const repository = new PaymentRepository()
  const usecase = new PaymentUseCase(repository)

  try {
    const chackoutDto = {
      amount: req.body.amount,
      orderId: req.body.orderId
    }

    const output = await usecase.execute(chackoutDto)
    res.send(output)
  } catch (e) {
    res.status(500).send(e)
  }
})
