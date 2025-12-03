import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {PaymentGateway} from '../domain/model/payment-gateway.entity';
import {PaymentGatewayResource, PaymentGatewayResponse} from './payment-gateway-response';

/**
 * Assembler class for converting between PaymentGateway entities and resources/responses.
 * Implements methods to transform data for API communication.
 */
export class PaymentGatewayAssembler implements BaseAssembler<PaymentGateway, PaymentGatewayResource, PaymentGatewayResponse> {
  /**
   * Converts a PaymentGatewayResource to a PaymentGateway entity.
   * @param resource - The PaymentGatewayResource to convert.
   * @returns The corresponding PaymentGateway entity.
   */
  toEntityFromResource(resource: PaymentGatewayResource): PaymentGateway {
    return new PaymentGateway({
      id: resource.id,
      name: resource.name,
      apiUrl: resource.apiUrl,
      clientId: resource.clientId,
      secretKey: resource.secretKey
    });
  }

  /**
   * Converts a PaymentGatewayResponse to an array of PaymentGateway entities.
   * @param response - The PaymentGatewayResponse to convert.
   * @returns An array of corresponding PaymentGateway entities.
   */
  toEntitiesFromResponse(response: PaymentGatewayResponse): PaymentGateway[] {
    return response.paymentGateways.map(resource => this.toEntityFromResource(resource as PaymentGatewayResource));
  }

  /**
   * Converts a PaymentGateway entity to a PaymentGatewayResource.
   * @param entity - The PaymentGateway entity to convert.
   * @returns The corresponding PaymentGatewayResource.
   */
  toResourceFromEntity(entity: PaymentGateway): PaymentGatewayResource {
    return {
      id: entity.id,
      name: entity.name,
      apiUrl: entity.apiUrl,
      clientId: entity.clientId,
      secretKey: entity.secretKey
    };
  }
}
