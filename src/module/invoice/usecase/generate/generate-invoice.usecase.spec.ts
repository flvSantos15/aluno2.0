import GenerateInvoiceUseCase from './generate-invoice.usecase'

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn()
  }
}

describe('Generate Invoice usecase unit test', () => {
  it('should add a invoice', async () => {
    const repository = MockRepository()
    const usecase = new GenerateInvoiceUseCase(repository)

    // input
    const input = {
      name: 'Invoice 1',
      document: '12345678',
      street: 'Street 1',
      number: '123',
      complement: 'Complemento',
      city: 'City 1',
      state: 'state 1',
      zipCode: 'zipcode 1',
      items: [
        {
          id: '1',
          name: 'Item 1',
          price: 100
        }
      ]
    }

    const result = await usecase.execute(input)

    expect(repository.generate).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.street).toBe(input.street)
    expect(result.items[0].name).toBe(input.items[0].name)
  })
})
