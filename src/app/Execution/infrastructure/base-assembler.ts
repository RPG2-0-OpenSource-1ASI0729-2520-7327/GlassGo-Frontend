/**
 * Abstract base assembler for converting between domain entities and API resources in the Execution bounded context.
 * Implements the Assembler pattern to handle data transformation between layers.
 * @template T The domain entity type.
 * @template R The API resource type.
 */
export abstract class BaseAssembler<T, R> {
  /**
   * Converts an API resource to a domain entity.
   * @param resource The API resource to convert.
   * @returns The corresponding domain entity.
   */
  abstract toEntity(resource: R): T;

  /**
   * Converts a domain entity to an API resource.
   * @param entity The domain entity to convert.
   * @returns The corresponding API resource.
   */
  abstract toResource(entity: T): R;

  /**
   * Converts a list of API resources to domain entities.
   * @param resources Array of API resources to convert.
   * @returns Array of corresponding domain entities.
   */
  toEntityList(resources: R[]): T[] {
    return resources.map(resource => this.toEntity(resource));
  }

  /**
   * Converts a list of domain entities to API resources.
   * @param entities Array of domain entities to convert.
   * @returns Array of corresponding API resources.
   */
  toResourceList(entities: T[]): R[] {
    return entities.map(entity => this.toResource(entity));
  }
}
