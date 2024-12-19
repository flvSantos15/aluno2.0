import InvoiceFacade from '../facade/invoice.facade'
import InvoiceRepository from '../repository/invoice.repository'
import GenerateInvoiceUseCase from '../usecase/generate/generate-invoice.usecase'
import FindInvoiceUsecase from '../usecase/find-invoice/find-invoice.usecase'

export default class InvoiceFacadeFactory {
  static create() {
    const invoiceRepository = new InvoiceRepository()

    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    const FindInvoiceUseCase = new FindInvoiceUsecase(invoiceRepository)

    const invoiceFacade = new InvoiceFacade({
      generate: generateInvoiceUseCase,
      find: FindInvoiceUseCase
    })

    return invoiceFacade
  }
}
