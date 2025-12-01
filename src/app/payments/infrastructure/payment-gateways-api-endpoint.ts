import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {PaymentGateway} from '../domain/model/payment-gateway.entity';
import {PaymentGatewayResource, PaymentGatewayResponse} from './payment-gateway-response';
import {PaymentGatewayAssembler} from './payment-gateway-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const paymentGatewaysEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderPaymentGatewaysEndpointPath}`;

/**
 * API endpoint for managing payment gateways related operations.
 * Extends the BaseApiEndpoint to provide CRUD operations for PaymentGateway entities.
 */
export class PaymentGatewaysApiEndpoint extends BaseApiEndpoint<PaymentGateway, PaymentGatewayResource, PaymentGatewayResponse, PaymentGatewayAssembler> {
  /**
   * Creates an instance of PaymentGatewaysApiEndpoint.
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http, paymentGatewaysEndpointUrl, new PaymentGatewayAssembler());
  }
}
