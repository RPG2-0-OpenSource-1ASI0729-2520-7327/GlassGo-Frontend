import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {SubscriptionPlan} from '../domain/model/subscription-plan.entity';
import {SubscriptionPlanResource, SubscriptionPlanResponse} from './subscription-plan-response';

/**
 * Assembler class for converting between SubscriptionPlan entities and resources/responses.
 * Implements methods to transform data for API communication.
 */
export class SubscriptionPlanAssembler implements BaseAssembler<SubscriptionPlan, SubscriptionPlanResource, SubscriptionPlanResponse> {
  /**
   * Converts a SubscriptionPlanResource to a SubscriptionPlan entity.
   * @param resource - The SubscriptionPlanResource to convert.
   * @returns The corresponding SubscriptionPlan entity.
   */
  toEntityFromResource(resource: SubscriptionPlanResource): SubscriptionPlan {
    return new SubscriptionPlan({
      id: resource.id,
      name: resource.name,
      description: resource.description,
      price: resource.price,
      durationInMonths: resource.durationInMonths
    });
  }

  /**
   * Converts a SubscriptionPlanResponse to an array of SubscriptionPlan entities.
   * @param response - The SubscriptionPlanResponse to convert.
   * @returns An array of corresponding SubscriptionPlan entities.
   */
  toEntitiesFromResponse(response: SubscriptionPlanResponse): SubscriptionPlan[] {
    return response.subscriptionPlans.map(resource => this.toEntityFromResource(resource as SubscriptionPlanResource));
  }

  /**
   * Converts a SubscriptionPlan entity to a SubscriptionPlanResource.
   * @param entity - The SubscriptionPlan entity to convert.
   * @returns The corresponding SubscriptionPlanResource.
   */
  toResourceFromEntity(entity: SubscriptionPlan): SubscriptionPlanResource {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.description,
      price: entity.price,
      durationInMonths: entity.durationInMonths
    };
  }
}
