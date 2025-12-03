/**
 * Resource interface representing a product in API responses.
 * Used for data transfer between the API and the domain layer.
 */
export interface ProductResource {
  /** Unique identifier of the product. */
  id: number;
  /** Name of the product. */
  name: string;
  /** Description of the product. */
  description: string;
  /** Price per unit of the product. */
  price: number;
  /** Currency symbol. */
  currency: string;
  /** Indicates if the product is available. */
  isAvailable: boolean;
  /** Product category. */
  category: string;
  /** Available stock quantity. */
  stockQuantity: number;
  /** Creation timestamp. */
  createdAt: string;
  /** Last update timestamp. */
  updatedAt: string;
}

