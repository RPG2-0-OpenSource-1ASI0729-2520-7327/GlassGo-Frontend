import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {SubscriptionPlan} from '../domain/model/subscription-plan.entity';
import {SubscriptionPlanResource, SubscriptionPlanResponse} from './subscription-plan-response';
import {SubscriptionPlanAssembler} from './subscription-plan-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const subscriptionPlansEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSubscriptionPlansEndpointPath}`;

/**
 * API endpoint for managing subscription plan related operations.
 * Extends the BaseApiEndpoint to provide CRUD operations for SubscriptionPlan entities.
 */
export class SubscriptionPlansApiEndpoint extends BaseApiEndpoint<SubscriptionPlan, SubscriptionPlanResource, SubscriptionPlanResponse, SubscriptionPlanAssembler> {
  /**
   * Creates an instance of SubscriptionPlansApiEndpoint.
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http, subscriptionPlansEndpointUrl, new SubscriptionPlanAssembler());
  }
}
