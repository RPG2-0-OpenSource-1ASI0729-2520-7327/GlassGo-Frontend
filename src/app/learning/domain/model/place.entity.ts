import {BaseEntity} from '../../../shared/domain/model/base-entity';

export class Place implements BaseEntity {
  private _id: number;
  private _name: string;
  private _address: string;

  constructor(category: { id: number; name: string ; address: string}) {
    this._id = category.id;
    this._name = category.name;
    this._address = category.address;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }
  get address(): string {
    return this._address;
  }

  set address(value: string) {
    this._address = value;
  }
}
