import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import InvoiceItemModel from './invoice-items.model'

@Table({
  tableName: 'invoices',
  timestamps: false
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column
  id: string

  @Column({ allowNull: false })
  name: string

  @Column({ allowNull: false })
  document: string

  @Column({ allowNull: false })
  street: string

  @Column({ allowNull: false })
  number: string

  @Column({ allowNull: true })
  complement: string

  @Column({ allowNull: false })
  city: string

  @Column({ allowNull: false })
  state: string

  @Column({ allowNull: false })
  zipcode: string

  @HasMany(() => InvoiceItemModel)
  declare items: InvoiceItemModel[]

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}
