/**
 * Abstract base entity class that all domain entities should extend.
 * Provides common properties for identification and auditing.
 */
export abstract class BaseEntity {
  /**
   * Unique identifier for the entity.
   */
  id: number = 0;

  /**
   * Timestamp when the entity was created.
   */
  createdAt: Date = new Date();

  /**
   * Timestamp when the entity was last updated.
   */
  updatedAt: Date = new Date();

  /**
   * Creates a new BaseEntity instance.
   * @param id - The unique identifier for the entity. Defaults to 0.
   */
  constructor(id: number = 0) {
    this.id = id;
  }
}
