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
      id: new Id(input.id) || new Id(),
      name: input.name,
      email: input.email,
      document: input.document
    }

    const client = new Client(props)
    await this._clientRepository.add(client)

    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      document: client.document,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt
    }
  }
}
