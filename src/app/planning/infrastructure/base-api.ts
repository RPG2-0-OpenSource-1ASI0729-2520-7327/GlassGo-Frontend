import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order } from '../domain/model/order';
import { OrderApiEndpoint } from '../infrastructure/order-api-endpoint';
import { OrderAssembler } from '../infrastructure/order-assembler';
import { OrderResource } from '../infrastructure/order-resource';
import { BaseResponse } from '../infrastructure/base-response';

/**
 * Base API service for order operations in the service planning bounded context.
 * Provides CRUD operations for orders using HTTP client and assemblers.
 */
@Injectable({
  providedIn: 'root'
})
export class BaseApi {
  private endpoint: OrderApiEndpoint;
  private assembler: OrderAssembler;

  /**
   * Creates an instance of BaseApi.
   * @param http - HTTP client for API calls.
   */
  constructor(private http: HttpClient) {
    this.endpoint = new OrderApiEndpoint();
    this.assembler = new OrderAssembler();
  }

  /**
   * Retrieves all orders.
   * @returns An observable of an array of orders.
   */
  getAll(): Observable<Order[]> {
    return this.http.get<BaseResponse<OrderResource[]>>(this.endpoint.getOrdersEndpoint())
      .pipe(
        map(response => this.assembler.toDomainModels(response.data)),
        catchError(this.handleError)
      );
  }

  /**
   * Retrieves an order by its ID.
   * @param id - The order ID.
   * @returns An observable of the order.
   */
  getById(id: number): Observable<Order> {
    return this.http.get<BaseResponse<OrderResource>>(this.endpoint.getOrderByIdEndpoint(id))
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  /**
   * Creates a new order.
   * @param order - The order to create.
   * @returns An observable of the created order.
   */
  create(order: Order): Observable<Order> {
    const resource = this.assembler.toResource(order);
    return this.http.post<BaseResponse<OrderResource>>(this.endpoint.createOrderEndpoint(), resource)
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  /**
   * Updates an existing order.
   * @param id - The order ID.
   * @param order - The updated order data.
   * @returns An observable of the updated order.
   */
  update(id: number, order: Order): Observable<Order> {
    const resource = this.assembler.toResource(order);
    return this.http.put<BaseResponse<OrderResource>>(this.endpoint.updateOrderEndpoint(id), resource)
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  /**
   * Deletes an order by its ID.
   * @param id - The order ID.
   * @returns An observable that completes on successful deletion.
   */
  delete(id: number): Observable<void> {
    return this.http.delete<BaseResponse<void>>(this.endpoint.deleteOrderEndpoint(id))
      .pipe(
        map(() => void 0),
        catchError(this.handleError)
      );
  }

  /**
   * Handles HTTP errors from API calls.
   * @param error - The HTTP error response.
   * @returns An observable that throws an error.
   * @private
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Unknown error occurred'));
  }
}
