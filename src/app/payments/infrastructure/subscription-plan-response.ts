import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for Subscription Plan data.
 * Represents a single subscription plan in API responses.
 */
export interface SubscriptionPlanResource extends BaseResource {
  id: number;
  name: string;
  description: string;
  price: number;
  durationInMonths: number;
}

/**
 * Response interface for Subscription Plan API responses.
 * Contains an array of Subscription Plan resources.
 */
export interface SubscriptionPlanResponse extends BaseResponse {
  subscriptionPlans: SubscriptionPlanResource[];
}
