export interface AddClientInputDto {
  id?: string
  name: string
  email: string
  address: string
}

export interface AddClientOututDto {
  id: string
  name: string
  email: string
  address: string
  createdAt: Date
  updatedAt: Date
}
