import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../domain/model/order';
import { OrderItem } from '../domain/model/order-item';
import { DeliveryInformation } from '../domain/model/delivery-information';
import { BaseApi } from '../infrastructure/base-api';

/**
 * Store for managing the state of order creation in the service planning bounded context.
 * Handles the current order, loading states, and error management.
 * @example
 * ```typescript
 * const store = new CreateOrderStore(baseApi);
 * store.updateDeliveryInformation(deliveryInfo);
 * store.addOrderItem(orderItem);
 * store.submitOrder().subscribe(order => console.log('Order created:', order));
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class CreateOrderStore {
  private currentOrderSubject = new BehaviorSubject<Order>(new Order());
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public currentOrder$ = this.currentOrderSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(private baseApi: BaseApi) {}

  /**
   * Gets the current order snapshot.
   */
  get currentOrder(): Order {
    return this.currentOrderSubject.value;
  }

  /**
   * Updates the delivery information of the current order.
   * @param deliveryInfo - The new delivery information.
   */
  updateDeliveryInformation(deliveryInfo: DeliveryInformation): void {
    const order = this.currentOrder;
    order.deliveryInformation = deliveryInfo;
    this.currentOrderSubject.next(order);
  }

  /**
   * Adds an order item to the current order.
   * @param item - The order item to add.
   */
  addOrderItem(item: OrderItem): void {
    const order = this.currentOrder;
    order.addItem(item);
    this.currentOrderSubject.next(order);
  }

  /**
   * Removes an order item from the current order by product ID.
   * @param productId - The product ID of the item to remove.
   */
  removeOrderItem(productId: number): void {
    const order = this.currentOrder;
    order.removeItem(productId);
    this.currentOrderSubject.next(order);
  }

  /**
   * Updates the quantity of a specific order item.
   * @param productId - The product ID of the item to update.
   * @param quantity - The new quantity.
   */
  updateOrderItemQuantity(productId: number, quantity: number): void {
    const order = this.currentOrder;
    order.updateItemQuantity(productId, quantity);
    this.currentOrderSubject.next(order);
  }

  /**
   * Submits the current order for creation.
   * @returns An observable of the created order.
   */
  submitOrder(): Observable<Order> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    return new Observable(observer => {
      this.baseApi.create(this.currentOrder).subscribe({
        next: (createdOrder) => {
          this.isLoadingSubject.next(false);
          this.resetOrder();
          observer.next(createdOrder);
          observer.complete();
        },
        error: (error) => {
          this.isLoadingSubject.next(false);
          this.errorSubject.next(error.message || 'Error creating order');
          observer.error(error);
        }
      });
    });
  }

  /**
   * Retrieves all orders.
   * @returns An observable of an array of orders.
   */
  getAllOrders(): Observable<Order[]> {
    return this.baseApi.getAll();
  }

  /**
   * Retrieves an order by its ID.
   * @param id - The ID of the order.
   * @returns An observable of the order.
   */
  getOrderById(id: number): Observable<Order> {
    return this.baseApi.getById(id);
  }

  /**
   * Updates an existing order.
   * @param id - The ID of the order to update.
   * @param order - The updated order data.
   * @returns An observable of the updated order.
   */
  updateOrder(id: number, order: Order): Observable<Order> {
    return this.baseApi.update(id, order);
  }

  /**
   * Deletes an order by its ID.
   * @param id - The ID of the order to delete.
   * @returns An observable that completes when the deletion is done.
   */
  deleteOrder(id: number): Observable<void> {
    return this.baseApi.delete(id);
  }

  /**
   * Resets the current order to a new empty order.
   */
  resetOrder(): void {
    this.currentOrderSubject.next(new Order());
    this.errorSubject.next(null);
  }

  /**
   * Clears any current error state.
   */
  clearError(): void {
    this.errorSubject.next(null);
  }
}
