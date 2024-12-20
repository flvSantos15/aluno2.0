import express, { Request, Response } from 'express'
import InvoiceRepository from '../../../module/invoice/repository/invoice.repository'
import FindInvoiceUseCase from '../../../module/invoice/usecase/find-invoice/find-invoice.usecase'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const repository = new InvoiceRepository()
  const usecase = new FindInvoiceUseCase(repository)

  const id = req.params.id

  try {
    const output = await usecase.execute({ id })
    if (!output) {
      return res.status(404).send({ message: 'Invoice not found' })
    }

    const result = {
      id: output.id,
      name: output.name,
      document: output.document,
      street: output.address.street,
      number: output.address.number,
      complement: output.address.complement,
      city: output.address.city,
      state: output.address.state,
      zipcode: output.address.zipcode,
      items: output.items,
      createdAt: output.createdAt
    }
    res.send(result)
  } catch (error) {
    console.error('Error in invoice route:', error)
    res.status(500).send({ message: 'Internal server error', error: error })
  }
})
