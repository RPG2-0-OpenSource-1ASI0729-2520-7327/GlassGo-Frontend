import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionResource, SubscriptionResponse} from './subscription-response';
import {SubscriptionAssembler} from './subscription-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const subscriptionsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderSubscriptionsEndpointPath}`;

/**
 * API endpoint for managing subscription related operations.
 * Extends the BaseApiEndpoint to provide CRUD operations for Subscription entities.
 */
export class SubscriptionsApiEndpoint extends BaseApiEndpoint<Subscription, SubscriptionResource, SubscriptionResponse, SubscriptionAssembler> {
  /**
   * Creates an instance of SubscriptionsApiEndpoint.
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http, subscriptionsEndpointUrl, new SubscriptionAssembler());
  }
}
