import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseResponse } from './base-response';
import { Product } from '../domain/model/product';
import { ProductResource } from './product-resource';
import { ProductAssembler } from './product-assembler';
import { ProductApiEndpoint } from './product-api-endpoint';

/**
 * API service for product-related operations.
 * Handles HTTP requests for product management in the service planning bounded context.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductApi {
  private productAssembler: ProductAssembler;

  constructor(private http: HttpClient) {
    this.productAssembler = new ProductAssembler();
  }

  /**
   * Retrieves all products from the API.
   * @returns Observable of Product array.
   */
  getAll(): Observable<Product[]> {
    return this.http.get<BaseResponse<ProductResource[]>>(ProductApiEndpoint.GET_ALL)
      .pipe(
        map((response: BaseResponse<ProductResource[]>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModels(response.data);
          }
          return [];
        })
      );
  }

  /**
   * Retrieves a product by its ID.
   * @param id - The product ID.
   * @returns Observable of Product.
   */
  getById(id: number): Observable<Product | null> {
    return this.http.get<BaseResponse<ProductResource>>(ProductApiEndpoint.getById(id))
      .pipe(
        map((response: BaseResponse<ProductResource>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModel(response.data);
          }
          return null;
        })
      );
  }

  /**
   * Creates a new product.
   * @param product - The product to create.
   * @returns Observable of the created Product.
   */
  create(product: Product): Observable<Product> {
    const resource = this.productAssembler.toResource(product);
    return this.http.post<BaseResponse<ProductResource>>(ProductApiEndpoint.CREATE, resource)
      .pipe(
        map((response: BaseResponse<ProductResource>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModel(response.data);
          }
          throw new Error(response.message || 'Failed to create product');
        })
      );
  }

  /**
   * Updates an existing product.
   * @param id - The product ID to update.
   * @param product - The updated product data.
   * @returns Observable of the updated Product.
   */
  update(id: number, product: Product): Observable<Product> {
    const resource = this.productAssembler.toResource(product);
    return this.http.put<BaseResponse<ProductResource>>(ProductApiEndpoint.update(id), resource)
      .pipe(
        map((response: BaseResponse<ProductResource>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModel(response.data);
          }
          throw new Error(response.message || 'Failed to update product');
        })
      );
  }

  /**
   * Deletes a product by its ID.
   * @param id - The product ID to delete.
   * @returns Observable of boolean indicating success.
   */
  delete(id: number): Observable<boolean> {
    return this.http.delete<BaseResponse<any>>(ProductApiEndpoint.delete(id))
      .pipe(
        map((response: BaseResponse<any>) => response.success)
      );
  }

  /**
   * Searches products by name.
   * @param searchTerm - The search term.
   * @returns Observable of Product array.
   */
  searchByName(searchTerm: string): Observable<Product[]> {
    return this.http.get<BaseResponse<ProductResource[]>>(ProductApiEndpoint.search(searchTerm))
      .pipe(
        map((response: BaseResponse<ProductResource[]>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModels(response.data);
          }
          return [];
        })
      );
  }

  /**
   * Retrieves products by category.
   * @param category - The product category.
   * @returns Observable of Product array.
   */
  getByCategory(category: string): Observable<Product[]> {
    return this.http.get<BaseResponse<ProductResource[]>>(ProductApiEndpoint.getByCategory(category))
      .pipe(
        map((response: BaseResponse<ProductResource[]>) => {
          if (response.success && response.data) {
            return this.productAssembler.toDomainModels(response.data);
          }
          return [];
        })
      );
  }

  /**
   * Checks product availability.
   * @param id - The product ID.
   * @returns Observable of availability status.
   */
  checkAvailability(id: number): Observable<boolean> {
    return this.http.get<BaseResponse<{ available: boolean }>>(ProductApiEndpoint.checkAvailability(id))
      .pipe(
        map((response: BaseResponse<{ available: boolean }>) => {
          if (response.success && response.data) {
            return response.data.available;
          }
          return false;
        })
      );
  }
}
