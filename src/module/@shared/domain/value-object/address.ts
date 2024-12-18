import ValueObject from '../../../@shared/domain/value-object/value-object.interface'

export default class Address implements ValueObject {
  private _street: string
  private _number: string
  private _complement: string
  private _city: string
  private _state: string
  private _zipcode: string

  constructor(
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipcode: string
  ) {
    this._street = street
    this._number = number
    this._complement = complement
    this._city = city
    this._state = state
    this._zipcode = zipcode
  }

  get street(): string {
    return this._street
  }

  get number(): string {
    return this._number
  }

  get complement(): string {
    return this._complement
  }

  get city(): string {
    return this._city
  }

  get state(): string {
    return this._state
  }

  get zipcode(): string {
    return this._zipcode
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error('Street is required')
    }
    if (this._number.length === 0) {
      throw new Error('Number is required')
    }
    if (this._complement.length === 0) {
      throw new Error('Complement is required')
    }
    if (this._city.length === 0) {
      throw new Error('City is required')
    }
    if (this._state.length === 0) {
      throw new Error('State is required')
    }
    if (this._zipcode.length === 0) {
      throw new Error('Zip code is required')
    }
  }
}
