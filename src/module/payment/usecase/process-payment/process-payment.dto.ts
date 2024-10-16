export interface ProcessPaymentInputDto {
  orderId: string
  amount: number
}

export interface ProcessPaymentOututDto {
  transactionId: string
  orderId: string
  amount: number
  status: string
  createdAt: Date
  updatedAt: Date
}
