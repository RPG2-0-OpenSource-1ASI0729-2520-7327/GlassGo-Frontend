import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for Subscription data.
 * Represents a single subscription in API responses.
 */
export interface SubscriptionResource extends BaseResource {
  id: number;
  userId: number;
  planId: number;
  status: string;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
}

/**
 * Response interface for Subscription API responses.
 * Contains an array of Subscription resources.
 */
export interface SubscriptionResponse extends BaseResponse {
  subscriptions: SubscriptionResource[];
}
