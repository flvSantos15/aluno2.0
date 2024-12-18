import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import InvoiceModel from './invoice.model'

@Table({
  tableName: 'orders_items',
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string

  @BelongsTo(() => InvoiceModel)
  declare invoice: InvoiceModel
}
