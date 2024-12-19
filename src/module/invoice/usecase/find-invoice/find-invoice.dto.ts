export interface FindInvoiceUseCaseInputDTO {
  id: string
}

export interface FindInvoiceUseCaseOutputDTO {
  id: string
  name: string
  document: string
  address: {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipcode: string
  }
  items: {
    id: string
    name: string
    price: number
  }[]
  createdAt: Date
}
