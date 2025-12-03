import { BaseEntity } from './base-entity';
import { Product } from './product';

/**
 * Domain entity representing an item within an order.
 * Encapsulates product details and pricing for a specific quantity.
 */
export class OrderItem extends BaseEntity {
  /**
   * The product associated with this order item.
   */
  product: Product;

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
   * @param product - Product associated with this item.
   * @param quantity - Quantity. Defaults to 1.
   */
  constructor(
    id: number = 0,
    product: Product,
    quantity: number = 1
  ) {
    super(id);
    this.product = product;
    this.productId = product.id;
    this.productName = product.name;
    this.quantity = quantity;
    this.unitPrice = product.price;
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

  /**
   * Gets the formatted unit price with currency.
   * @returns The formatted unit price string.
   */
  getFormattedUnitPrice(): string {
    return this.product.getFormattedPrice();
  }

  /**
   * Gets the formatted total price with currency.
   * @returns The formatted total price string.
   */
  getFormattedTotalPrice(): string {
    return `${this.product.currency} ${this.totalPrice.toFixed(2)}`;
  }

  /**
   * Checks if the requested quantity is available in stock.
   * @returns True if quantity is available, false otherwise.
   */
  isQuantityAvailable(): boolean {
    return this.product.hasEnoughStock(this.quantity);
  }
}
