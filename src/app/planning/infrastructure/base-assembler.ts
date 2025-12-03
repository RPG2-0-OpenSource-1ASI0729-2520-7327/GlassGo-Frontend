/**
 * Abstract base assembler for converting between domain models and resources in the service planning bounded context.
 * @template T - The domain model type.
 * @template R - The resource type.
 */
export abstract class BaseAssembler<T, R> {
  /**
   * Converts a resource to a domain model.
   * @param resource - The resource to convert.
   * @returns The corresponding domain model.
   */
  abstract toDomainModel(resource: R): T;

  /**
   * Converts a domain model to a resource.
   * @param domainModel - The domain model to convert.
   * @returns The corresponding resource.
   */
  abstract toResource(domainModel: T): R;

  /**
   * Converts an array of resources to an array of domain models.
   * @param resources - The resources to convert.
   * @returns An array of domain models.
   */
  toDomainModels(resources: R[]): T[] {
    return resources.map(resource => this.toDomainModel(resource));
  }

  /**
   * Converts an array of domain models to an array of resources.
   * @param domainModels - The domain models to convert.
   * @returns An array of resources.
   */
  toResources(domainModels: T[]): R[] {
    return domainModels.map(domainModel => this.toResource(domainModel));
  }
}
