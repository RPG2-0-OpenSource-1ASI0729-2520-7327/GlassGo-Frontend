import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Order } from '../domain/model/order';
import { OrderApiEndpoint } from '../infrastructure/order-api-endpoint';
import { OrderAssembler } from '../infrastructure/order-assembler';
import { OrderResource } from '../infrastructure/order-resource';
import { BaseResponse } from '../infrastructure/base-response';

@Injectable({
  providedIn: 'root'
})
export class BaseApi {
  private endpoint: OrderApiEndpoint;
  private assembler: OrderAssembler;

  constructor(private http: HttpClient) {
    this.endpoint = new OrderApiEndpoint();
    this.assembler = new OrderAssembler();
  }

  getAll(): Observable<Order[]> {
    return this.http.get<BaseResponse<OrderResource[]>>(this.endpoint.getOrdersEndpoint())
      .pipe(
        map(response => this.assembler.toDomainModels(response.data)),
        catchError(this.handleError)
      );
  }

  getById(id: number): Observable<Order> {
    return this.http.get<BaseResponse<OrderResource>>(this.endpoint.getOrderByIdEndpoint(id))
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  create(order: Order): Observable<Order> {
    const resource = this.assembler.toResource(order);
    return this.http.post<BaseResponse<OrderResource>>(this.endpoint.createOrderEndpoint(), resource)
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  update(id: number, order: Order): Observable<Order> {
    const resource = this.assembler.toResource(order);
    return this.http.put<BaseResponse<OrderResource>>(this.endpoint.updateOrderEndpoint(id), resource)
      .pipe(
        map(response => this.assembler.toDomainModel(response.data)),
        catchError(this.handleError)
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<BaseResponse<void>>(this.endpoint.deleteOrderEndpoint(id))
      .pipe(
        map(() => void 0),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error(error.message || 'Unknown error occurred'));
  }
}
