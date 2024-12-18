import Address from '../../../@shared/domain/value-object/address'

export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  document: string
}

export interface AddClientOututDto {
  id: string
  name: string
  email: string
  document: string
  createdAt: Date
  updatedAt: Date
}
