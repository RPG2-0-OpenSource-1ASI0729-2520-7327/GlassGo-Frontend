import { BaseEntity } from './base-entity';
import { OrderItem } from './order-item';
import { DeliveryInformation } from './delivery-information';

export enum OrderStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PROCESS = 'IN_PROCESS',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export class Order extends BaseEntity {
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  deliveryInformation: DeliveryInformation;
  subtotal: number = 0;
  vatRate: number;
  vatAmount: number = 0;
  total: number = 0;

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

  addItem(item: OrderItem): void {
    const existingItem = this.items.find(i => i.productId === item.productId);
    if (existingItem) {
      existingItem.updateQuantity(existingItem.quantity + item.quantity);
    } else {
      this.items.push(item);
    }
    this.calculateTotals();
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(item => item.productId !== productId);
    this.calculateTotals();
  }

  updateItemQuantity(productId: number, quantity: number): void {
    const item = this.items.find(i => i.productId === productId);
    if (item) {
      item.updateQuantity(quantity);
      this.calculateTotals();
    }
  }

  private calculateTotals(): void {
    this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    this.vatAmount = this.subtotal * this.vatRate;
    this.total = this.subtotal + this.vatAmount;
  }

  getItemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
