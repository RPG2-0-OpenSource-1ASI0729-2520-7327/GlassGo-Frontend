import { BaseEntity } from './base-entity';
import { OrderItem } from './order-item';
import { DeliveryInformation } from './delivery-information';

/**
 * Enumeration of possible order statuses in the service planning domain.
 */
export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROCESS = 'IN_PROCESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

/**
 * Domain entity representing an order in the service planning bounded context.
 * Encapsulates order details, items, and delivery information.
 * @example
 * ```typescript
 * const order = new Order(
 *   1,
 *   'ORD-001',
 *   OrderStatus.PENDING,
 *   [new OrderItem(1, 101, 'Product A', 2, 10.0)],
 *   new DeliveryInformation(1, '2023-12-01', '10:00', '123 Main St', 'Leave at door')
 * );
 * order.calculateTotals(); // Updates subtotal, VAT, and total
 * ```
 */
export class Order extends BaseEntity {
  /**
   * Unique order number for identification.
   */
  orderNumber: string;

  /**
   * Current status of the order.
   */
  status: OrderStatus;

  /**
   * List of items included in the order.
   */
  items: OrderItem[];

  /**
   * Delivery information for the order.
   */
  deliveryInformation: DeliveryInformation;

  /**
   * Subtotal amount before VAT.
   */
  subtotal: number = 0;

  /**
   * VAT rate applied to the order.
   */
  vatRate: number;

  /**
   * Calculated VAT amount.
   */
  vatAmount: number = 0;

  /**
   * Total amount including VAT.
   */
  total: number = 0;

  /**
   * Creates a new Order instance.
   * @param id - Unique identifier. Defaults to 0.
   * @param orderNumber - Unique order number. Defaults to empty string.
   * @param status - Order status. Defaults to DRAFT.
   * @param items - Array of order items. Defaults to empty array.
   * @param deliveryInformation - Delivery details. Defaults to new instance.
   * @param vatRate - VAT rate. Defaults to 0.18.
   */
  constructor(
    id: number = 0,
    orderNumber: string = '',
    status: OrderStatus = OrderStatus.DRAFT,
    items: OrderItem[] = [],
    deliveryInformation: DeliveryInformation = new DeliveryInformation(),
    vatRate: number = 0.18
  ) {
    super(id);
    this.orderNumber = orderNumber;
    this.status = status;
    this.items = items;
    this.deliveryInformation = deliveryInformation;
    this.vatRate = vatRate;
    this.calculateTotals();
  }

  /**
   * Adds an item to the order. If the item already exists, updates its quantity.
   * @param item - The order item to add.
   */
  addItem(item: OrderItem): void {
    const existingItem = this.items.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.updateQuantity(existingItem.quantity + item.quantity);
    } else {
      this.items.push(item);
    }
    this.calculateTotals();
  }

  /**
   * Removes an item from the order by product ID.
   * @param productId - The product ID of the item to remove.
   */
  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.productId !== productId);
    this.calculateTotals();
  }

  /**
   * Updates the quantity of a specific item in the order.
   * @param productId - The product ID of the item to update.
   * @param quantity - The new quantity.
   */
  updateItemQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.updateQuantity(quantity);
      this.calculateTotals();
    }
  }

  /**
   * Calculates the subtotal, VAT amount, and total for the order.
   * @private
   */
  private calculateTotals(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    this.vatAmount = this.subtotal * this.vatRate;
    this.total = this.subtotal + this.vatAmount;
  }

  /**
   * Gets the total count of items in the order.
   * @returns The total quantity of all items.
   */
  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
