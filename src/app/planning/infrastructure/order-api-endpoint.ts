import { BaseApiEndpoint } from './base-api-endpoint';

/**
 * API endpoint class for order-related operations.
 * Extends BaseApiEndpoint to provide order-specific endpoint URLs.
 */
export class OrderApiEndpoint extends BaseApiEndpoint {
  /**
   * Gets the endpoint URL for fetching all orders.
   * @returns The orders endpoint URL.
   */
  getOrdersEndpoint(): string {
    return `${this.baseUrl}/orders`;
  }

  /**
   * Gets the endpoint URL for fetching an order by ID.
   * @param id - The order ID.
   * @returns The order endpoint URL.
   */
  getOrderByIdEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  /**
   * Gets the endpoint URL for creating a new order.
   * @returns The create order endpoint URL.
   */
  createOrderEndpoint(): string {
    return `${this.baseUrl}/orders`;
  }

  /**
   * Gets the endpoint URL for updating an order.
   * @param id - The order ID.
   * @returns The update order endpoint URL.
   */
  updateOrderEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  /**
   * Gets the endpoint URL for deleting an order.
   * @param id - The order ID.
   * @returns The delete order endpoint URL.
   */
  deleteOrderEndpoint(id: number): string {
    return `${this.baseUrl}/orders/${id}`;
  }

  /**
   * Gets the endpoint URL for fetching orders by status.
   * @param status - The order status.
   * @returns The orders by status endpoint URL.
   */
  getOrdersByStatusEndpoint(status: string): string {
    return `${this.baseUrl}/orders?status=${status}`;
  }
}
