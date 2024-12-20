import express, { Request, Response } from 'express'
import AddProductUseCase from '../../../module/product-adm/usecase/add-product/add-product.usecase'
import ProductRepository from '../../../module/product-adm/repository/product.repository'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const repository = new ProductRepository()
  const usecase = new AddProductUseCase(repository)

  try {
    const productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock
    }

    const output = await usecase.execute(productDto)
    res.send(output)
  } catch (e) {
    res.status(500).send(e)
  }
})
