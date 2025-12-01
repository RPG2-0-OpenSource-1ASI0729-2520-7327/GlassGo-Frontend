import { BaseEntity } from './base-entity';

/**
 * Domain entity representing an item within an order.
 * Encapsulates product details and pricing for a specific quantity.
 */
export class OrderItem extends BaseEntity {
  /**
   * Identifier of the product.
   */
  productId: number;

  /**
   * Name of the product.
   */
  productName: string;

  /**
   * Quantity of the product in the order.
   */
  quantity: number;

  /**
   * Price per unit of the product.
   */
  unitPrice: number;

  /**
   * Total price for this item (quantity * unitPrice).
   */
  totalPrice: number;

  /**
   * Creates a new OrderItem instance.
   * @param id - Unique identifier. Defaults to 0.
   * @param productId - Product identifier. Defaults to 0.
   * @param productName - Product name. Defaults to empty string.
   * @param quantity - Quantity. Defaults to 1.
   * @param unitPrice - Unit price. Defaults to 0.
   */
  constructor(
    id: number = 0,
    productId: number = 0,
    productName: string = '',
    quantity: number = 1,
    unitPrice: number = 0
  ) {
    super(id);
    this.productId = productId;
    this.productName = productName;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = this.calculateTotalPrice();
  }

  /**
   * Calculates the total price based on quantity and unit price.
   * @returns The calculated total price.
   * @private
   */
  private calculateTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  /**
   * Updates the quantity of the item and recalculates the total price.
   * @param quantity - The new quantity.
   */
  updateQuantity(quantity: number): void {
    this.quantity = quantity;
    this.totalPrice = this.calculateTotalPrice();
  }
}
