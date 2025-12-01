import { BaseEntity } from './base-entity';

export class OrderItem extends BaseEntity {
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;

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

  private calculateTotalPrice(): number {
    return this.quantity * this.unitPrice;
  }

  updateQuantity(quantity: number): void {
    this.quantity = quantity;
    this.totalPrice = this.calculateTotalPrice();
  }
}
