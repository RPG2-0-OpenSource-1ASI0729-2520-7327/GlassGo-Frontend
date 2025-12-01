import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';


/**
 * Resource interface for Payment Gateway data.
 * Represents a single payment gateway in API responses.
 */
export interface PaymentGatewayResource extends BaseResource {
  id: number;
  name: string;
  apiUrl: string;
  clientId: number;
  secretKey: string;
}

/**
 * Response interface for Payment Gateway API responses.
 * Contains an array of Payment Gateway resources.
 */
export interface PaymentGatewayResponse extends BaseResponse {
  paymentGateways: PaymentGatewayResource[];
}
