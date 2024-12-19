import FindInvoiceUseCase from './find-invoice.usecase'

const address = {
  street: 'Street 1',
  number: '123',
  complement: 'Complemento 1',
  city: 'City 1',
  state: 'state 1',
  zipcode: 'zipcode 1'
}

const item = {
  id: '1',
  name: 'Item 1 find usecase',
  price: 100
}

const invoice = {
  id: '1',
  name: 'Invoice 1 find usecase',
  document: '12345678',
  items: [item],
  address
}

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe('Find Invoice usecase unit test', () => {
  it('should add a invoice', async () => {
    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)

    const id = {
      id: '1'
    }

    const result = await usecase.execute(id)

    expect(repository.find).toHaveBeenCalled()
    expect(result.name).toBe('Invoice 1 find usecase')
    expect(result.document).toBe('12345678')
    expect(result.address.street).toBe('Street 1')
    expect(result.items[0].name).toBe('Item 1 find usecase')
  })
})
