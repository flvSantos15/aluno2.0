import {
  Table,
  Model,
  PrimaryKey,
  Column,
  ForeignKey
} from 'sequelize-typescript'
import InvoiceModel from './invoice.model'

@Table({
  tableName: 'invoice_items',
  timestamps: false
})
export default class InvoiceItemModel extends Model {
  @PrimaryKey
  @Column
  declare id: string

  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoice_id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare price: number
}
