import express, { Express } from 'express'
import { Sequelize } from 'sequelize-typescript'

import { clientRoute } from './routes/clients.route'
import { invoiceRoute } from './routes/invoice.route'
import { checkoutRoute } from './routes/checkout.route'
import { productRoute } from './routes/products.route'

import ClientModel from '../../module/client-adm/repository/client.model'
// import { ProductModel as ProductModelAdm } from '../../module/product-adm/repository/product.model'
import ProductModelAdm from '../../module/product-adm/repository/product.model'
import StoreProductModel from '../../module/store-catalog/repository/product.model'
import InvoiceModel from '../../module/invoice/repository/invoice.model'
import InvoiceItemModel from '../../module/invoice/repository/invoice-items.model'
import TransactionModel from '../../module/payment/repository/transaction.model'

export const app: Express = express()

app.use(express.json())
app.use('/products', productRoute)
app.use('/clients', clientRoute)
app.use('/checkout', checkoutRoute)
app.use('/invoice', invoiceRoute)

export let sequelize: Sequelize

async function setubDb() {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

  await sequelize.addModels([
    ClientModel,
    ProductModelAdm,
    StoreProductModel,
    InvoiceModel,
    InvoiceItemModel,
    TransactionModel
  ])
  await sequelize.sync()
}

setubDb()
