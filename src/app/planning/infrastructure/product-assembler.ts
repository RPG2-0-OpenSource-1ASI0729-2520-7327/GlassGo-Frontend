import { BaseAssembler } from './base-assembler';
import { Product } from '../domain/model/product';
import { ProductResource } from './product-resource';

/**
 * Assembler for transforming between Product domain entities and ProductResource DTOs.
 * Handles the conversion logic between the domain layer and infrastructure layer.
 */
export class ProductAssembler extends BaseAssembler<Product, ProductResource> {
  /**
   * Converts a ProductResource to a Product domain entity.
   * @param resource - The ProductResource to convert.
   * @returns The corresponding Product domain entity.
   */
  override toDomainModel(resource: ProductResource): Product {
    return new Product(
      resource.id,
      resource.name,
      resource.description,
      resource.price,
      resource.currency,
      resource.isAvailable,
      resource.category,
      resource.stockQuantity
    );
  }

  /**
   * Converts a Product domain entity to a ProductResource.
   * @param entity - The Product domain entity to convert.
   * @returns The corresponding ProductResource.
   */
  override toResource(entity: Product): ProductResource {
    const now = new Date().toISOString();
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      currency: entity.currency,
      isAvailable: entity.isAvailable,
      category: entity.category,
      stockQuantity: entity.stockQuantity,
      createdAt: now,
      updatedAt: now
    };
  }

  /**
   * Converts a ProductResource to a Product domain entity.
   * @param resource - The ProductResource to convert.
   * @returns The corresponding Product domain entity.
   * @deprecated Use toDomainModel instead
   */
  toDomainEntity(resource: ProductResource): Product {
    return this.toDomainModel(resource);
  }

  /**
   * Converts an array of ProductResources to Product domain entities.
   * @param resources - Array of ProductResources to convert.
   * @returns Array of Product domain entities.
   * @deprecated Use toDomainModels instead
   */
  toDomainEntities(resources: ProductResource[]): Product[] {
    return this.toDomainModels(resources);
  }

  /**
   * Converts an array of Product domain entities to ProductResources.
   * @param entities - Array of Product domain entities to convert.
   * @returns Array of ProductResources.
   */
  override toResources(entities: Product[]): ProductResource[] {
    return super.toResources(entities);
  }
}
