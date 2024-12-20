import express, { Request, Response } from 'express'
import { AddClientUsecase } from '../../../module/client-adm/usecase/add-client/add-client.usecase'
import ClientRepository from '../../../module/client-adm/repository/client.repository'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const repository = new ClientRepository()
  const usecase = new AddClientUsecase(repository)

  try {
    const customerDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document
    }

    const output = await usecase.execute(customerDto)
    res.send(output)
  } catch (e) {
    res.status(500).send(e)
  }
})
