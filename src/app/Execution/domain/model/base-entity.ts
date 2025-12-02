/**
 * Base entity class for domain objects in the Execution bounded context.
 * Provides common properties for entities that require identification and timestamp tracking.
 */
export class BaseEntity {
  /** Unique identifier for the entity. */
  id: number;
  /** Timestamp when the entity was created. */
  createdAt: Date;
  /** Timestamp when the entity was last updated. */
  updatedAt: Date;

  /**
   * Constructs a new BaseEntity instance with default values.
   */
  constructor() {
    this.id = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
