import { BaseEntity } from './base-entity';

/**
 * Domain entity representing a product in the service planning bounded context.
 * Encapsulates product information including name, price, and availability.
 */
export class Product extends BaseEntity {
  /**
   * Name of the product.
   */
  name: string;

  /**
   * Description of the product.
   */
  description: string;

  /**
   * Price per unit of the product.
   */
  price: number;

  /**
   * Currency symbol (e.g., 'S/.', '$', '€').
   */
  currency: string;

  /**
   * Indicates if the product is available for ordering.
   */
  isAvailable: boolean;

  /**
   * Product category or type.
   */
  category: string;

  /**
   * Stock quantity available.
   */
  stockQuantity: number;

  /**
   * Creates a new Product instance.
   * @param id - Unique identifier. Defaults to 0.
   * @param name - Product name. Defaults to empty string.
   * @param description - Product description. Defaults to empty string.
   * @param price - Product price. Defaults to 0.
   * @param currency - Currency symbol. Defaults to 'S/.'.
   * @param isAvailable - Availability status. Defaults to true.
   * @param category - Product category. Defaults to empty string.
   * @param stockQuantity - Stock quantity. Defaults to 0.
   */
  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    price: number = 0,
    currency: string = 'S/.',
    isAvailable: boolean = true,
    category: string = '',
    stockQuantity: number = 0
  ) {
    super(id);
    this.name = name;
    this.description = description;
    this.price = price;
    this.currency = currency;
    this.isAvailable = isAvailable;
    this.category = category;
    this.stockQuantity = stockQuantity;
  }

  /**
   * Gets the formatted price with currency.
   * @returns The formatted price string.
   */
  getFormattedPrice(): string {
    return `${this.currency} ${this.price.toFixed(2)}`;
  }

  /**
   * Checks if the product has sufficient stock for the requested quantity.
   * @param requestedQuantity - The quantity requested.
   * @returns True if there's sufficient stock, false otherwise.
   */
  hasEnoughStock(requestedQuantity: number): boolean {
    return this.stockQuantity >= requestedQuantity;
  }

  /**
   * Reduces the stock quantity by the specified amount.
   * @param quantity - The quantity to reduce.
   * @throws Error if insufficient stock.
   */
  reduceStock(quantity: number): void {
    if (!this.hasEnoughStock(quantity)) {
      throw new Error(`Insufficient stock. Available: ${this.stockQuantity}, Requested: ${quantity}`);
    }
    this.stockQuantity -= quantity;
  }

  /**
   * Increases the stock quantity by the specified amount.
   * @param quantity - The quantity to add.
   */
  addStock(quantity: number): void {
    this.stockQuantity += quantity;
  }
}
