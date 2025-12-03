import { BaseApiEndpoint } from './base-api-endpoint';

/**
 * API endpoint configurations for tracking operations in the Execution bounded context.
 * Extends base endpoints with tracking-specific URL patterns.
 */
export class TrackingApiEndpoint extends BaseApiEndpoint {
  /** Base endpoint for tracking resources. */
  static readonly TRACKING = '/tracking';
  /**
   * Generates the endpoint for retrieving a specific tracking by number.
   * @param trackingNumber The unique tracking number.
   * @returns The full endpoint URL for the tracking.
   */
  static readonly TRACKING_BY_NUMBER = (trackingNumber: string) =>
    `${TrackingApiEndpoint.TRACKING}/${trackingNumber}`;
  /** Endpoint for searching trackings. */
  static readonly TRACKING_SEARCH = '/tracking/search';
}
