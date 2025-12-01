import { BaseApiEndpoint } from './base-api-endpoint';

export class OrderApiEndpoint extends BaseApiEndpoint {
  getOrdersEndpoint(): string {
    return `${this.baseUrl}/orders`;
  }

  getOrderByIdEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  createOrderEndpoint(): string {
    return `${this.baseUrl}/orders`;
  }

  updateOrderEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  deleteOrderEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  getOrdersByStatusEndpoint(status: string): string {
    return `${this.baseUrl}/orders?status=${status}`;
  }
}
