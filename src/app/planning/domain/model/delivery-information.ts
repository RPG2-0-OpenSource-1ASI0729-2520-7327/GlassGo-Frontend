import { BaseEntity } from './base-entity';

/**
 * Domain entity representing delivery information for an order.
 * Contains details about when and where the order should be delivered.
 */
export class DeliveryInformation extends BaseEntity {
  /**
   * Date of delivery in string format.
   */
  deliveryDate: string;

  /**
   * Time of delivery in string format.
   */
  deliveryTime: string;

  /**
   * Address where the order should be delivered.
   */
  deliveryAddress: string;

  /**
   * Any special instructions for delivery.
   */
  specialInstructions: string;

  /**
   * Creates a new DeliveryInformation instance.
   * @param id - Unique identifier. Defaults to 0.
   * @param deliveryDate - Delivery date. Defaults to empty string.
   * @param deliveryTime - Delivery time. Defaults to empty string.
   * @param deliveryAddress - Delivery address. Defaults to empty string.
   * @param specialInstructions - Special instructions. Defaults to empty string.
   */
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
