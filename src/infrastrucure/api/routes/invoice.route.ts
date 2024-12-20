import express, { Request, Response } from 'express'
import InvoiceRepository from '../../../module/invoice/repository/invoice.repository'
import FindInvoiceUseCase from '../../../module/invoice/usecase/find-invoice/find-invoice.usecase'

export const invoiceRoute = express.Router()

invoiceRoute.get('/invoices', async (req: Request, res: Response) => {
  const repository = new InvoiceRepository()
  const usecase = new FindInvoiceUseCase(repository)

  const id = req.query.id

  try {
    const output = await usecase.execute({ id: String(id) })
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})
