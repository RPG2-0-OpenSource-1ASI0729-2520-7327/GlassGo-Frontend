import { BaseApiEndpoint } from './base-api-endpoint';

/**
 * API endpoint configuration for product-related operations.
 * Extends the base API endpoint to provide product-specific endpoints.
 */
export class ProductApiEndpoint extends BaseApiEndpoint {
  private static readonly BASE_URL = 'http://localhost:3000';

  /**
   * Endpoint for retrieving all products.
   */
  public static readonly GET_ALL = `${ProductApiEndpoint.BASE_URL}/products`;

  /**
   * Endpoint for retrieving a product by ID.
   * @param id - The product ID.
   * @returns The endpoint URL for the specific product.
   */
  public static getById(id: number): string {
    return `${ProductApiEndpoint.BASE_URL}/products/${id}`;
  }

  /**
   * Endpoint for creating a new product.
   */
  public static readonly CREATE = `${ProductApiEndpoint.BASE_URL}/products`;

  /**
   * Endpoint for updating an existing product.
   * @param id - The product ID to update.
   * @returns The endpoint URL for updating the specific product.
   */
  public static update(id: number): string {
    return `${ProductApiEndpoint.BASE_URL}/products/${id}`;
  }

  /**
   * Endpoint for deleting a product.
   * @param id - The product ID to delete.
   * @returns The endpoint URL for deleting the specific product.
   */
  public static delete(id: number): string {
    return `${ProductApiEndpoint.BASE_URL}/products/${id}`;
  }

  /**
   * Endpoint for searching products by category.
   * @param category - The product category.
   * @returns The endpoint URL for products in the specific category.
   */
  public static getByCategory(category: string): string {
    return `${ProductApiEndpoint.BASE_URL}/products?category=${encodeURIComponent(category)}`;
  }

  /**
   * Endpoint for searching products by name.
   * @param searchTerm - The search term.
   * @returns The endpoint URL for searching products.
   */
  public static search(searchTerm: string): string {
    return `${ProductApiEndpoint.BASE_URL}/products/search?q=${encodeURIComponent(searchTerm)}`;
  }

  /**
   * Endpoint for checking product availability.
   * @param id - The product ID.
   * @returns The endpoint URL for checking product availability.
   */
  public static checkAvailability(id: number): string {
    return `${ProductApiEndpoint.BASE_URL}/products/${id}/availability`;
  }
}
