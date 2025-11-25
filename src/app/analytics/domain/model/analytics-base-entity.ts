import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Analytics specific base entity extending the shared BaseEntity.
 * Provides common fields for all analytics entities.
 */
export interface AnalyticsBaseEntity extends BaseEntity {
  /**
   * When the record was created.
   */
  createdAt: Date;

  /**
   * When the record was last updated.
   */
  updatedAt: Date;

  /**
   * Whether the record is active.
   */
  isActive: boolean;
}
