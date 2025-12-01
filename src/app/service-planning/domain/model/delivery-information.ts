import { BaseEntity } from './base-entity';

export class DeliveryInformation extends BaseEntity {
  deliveryDate: string;
  deliveryTime: string;
  deliveryAddress: string;
  specialInstructions: string;

  constructor(
    id: number = 0,
    deliveryDate: string = '',
    deliveryTime: string = '',
    deliveryAddress: string = '',
    specialInstructions: string = ''
  ) {
    super(id);
    this.deliveryDate = deliveryDate;
    this.deliveryTime = deliveryTime;
    this.deliveryAddress = deliveryAddress;
    this.specialInstructions = specialInstructions;
  }
}
