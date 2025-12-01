import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../domain/model/order';
import { OrderItem } from '../domain/model/order-item';
import { DeliveryInformation } from '../domain/model/delivery-information';
import { BaseApi } from '../infrastructure/base-api';

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

  get currentOrder(): Order {
    return this.currentOrderSubject.value;
  }

  updateDeliveryInformation(deliveryInfo: DeliveryInformation): void {
    const order = this.currentOrder;
    order.deliveryInformation = deliveryInfo;
    this.currentOrderSubject.next(order);
  }

  addOrderItem(item: OrderItem): void {
    const order = this.currentOrder;
    order.addItem(item);
    this.currentOrderSubject.next(order);
  }

  removeOrderItem(productId: number): void {
    const order = this.currentOrder;
    order.removeItem(productId);
    this.currentOrderSubject.next(order);
  }

  updateOrderItemQuantity(productId: number, quantity: number): void {
    const order = this.currentOrder;
    order.updateItemQuantity(productId, quantity);
    this.currentOrderSubject.next(order);
  }

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

  getAllOrders(): Observable<Order[]> {
    return this.baseApi.getAll();
  }

  getOrderById(id: number): Observable<Order> {
    return this.baseApi.getById(id);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.baseApi.update(id, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.baseApi.delete(id);
  }

  resetOrder(): void {
    this.currentOrderSubject.next(new Order());
    this.errorSubject.next(null);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
