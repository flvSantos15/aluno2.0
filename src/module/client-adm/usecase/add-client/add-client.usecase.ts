import Id from '../../../@shared/domain/value-object/id.value-object'
import { Client } from '../../domain/client.entity'
import { ClientGateway } from '../../gateway/client.gateway'
import { AddClientInputDto, AddClientOututDto } from './add-client.usecase.dto'

export class AddClientUsecase {
  private _clientRepository: ClientGateway

  constructor(clientRepository: ClientGateway) {
    this._clientRepository = clientRepository
  }

  async execute(input: AddClientInputDto): Promise<AddClientOututDto> {
    const props = {
      name: input.name,
      email: input.email,
      address: input.address
    }

    const client = new Client(props)
    this._clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
