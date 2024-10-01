export interface FindStoreCatalogFacadeInputDto {
  id: string
}

export interface FindStoreCatalogFacadeOututDto {
  id: string
  name: string
  description: string
  salesPrice: number
}

export interface FindAllStoreCatalogFacadeOututDto {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}

export interface StoreCatalogFacade {
  find(
    id: FindStoreCatalogFacadeInputDto
  ): Promise<FindStoreCatalogFacadeOututDto>
  findAll(): Promise<FindAllStoreCatalogFacadeOututDto>
}
