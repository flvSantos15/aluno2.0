import { AddClientUsecase } from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add Client Usecase test', () => {
  it('should add a client', async () => {
    const repository = MockRepository()
    const usecase = new AddClientUsecase(repository)

    const input = {
      name: 'Client 1',
      email: 'client1@example.com',
      document: '1234-5678'
    }

    const result = await usecase.execute(input)

    expect(repository.add).toHaveBeenCalled()
    expect(result.id).toBeDefined()
    expect(result.name).toEqual(input.name)
  })
})
