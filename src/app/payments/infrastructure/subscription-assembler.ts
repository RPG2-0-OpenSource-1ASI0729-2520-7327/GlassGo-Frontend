import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionResource, SubscriptionResponse} from './subscription-response';

/**
 * Assembler class for converting between Subscription entities and resources/responses.
 * Implements methods to transform data for API communication.
 */
export class SubscriptionAssembler implements BaseAssembler<Subscription, SubscriptionResource, SubscriptionResponse> {
  /**
   * Converts a SubscriptionResource to a Subscription entity.
   * @param resource - The SubscriptionResource to convert.
   * @returns The corresponding Subscription entity.
   */
  toEntityFromResource(resource: SubscriptionResource): Subscription {
    return new Subscription({
      id: resource.id,
      userId: resource.userId,
      planId: resource.planId,
      status: resource.status,
      startDate: new Date(resource.startDate),
      endDate: new Date(resource.endDate),
      autoRenew: resource.autoRenew
    });
  }

  /**
   * Converts a SubscriptionResponse to an array of Subscription entities.
   * @param response - The SubscriptionResponse to convert.
   * @returns An array of corresponding Subscription entities.
   */
  toEntitiesFromResponse(response: SubscriptionResponse): Subscription[] {
    return response.subscriptions.map(resource => this.toEntityFromResource(resource as SubscriptionResource));
  }

  /**
   * Converts a Subscription entity to a SubscriptionResource.
   * @param entity - The Subscription entity to convert.
   * @returns The corresponding SubscriptionResource.
   */
  toResourceFromEntity(entity: Subscription): SubscriptionResource {
    return {
      id: entity.id,
      userId: entity.userId,
      planId: entity.planId,
      status: entity.status,
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate.toISOString(),
      autoRenew: entity.autoRenew
    };
  }
}
