import {BaseResource, BaseResponse} from '../../shared/infrastructure/base-response';

/**
 * Resource interface for Transaction data.
 * Represents a single transaction in API responses.
 */
export interface TransactionResource extends BaseResource {
  id: number;
  subscriptionId: number;
  amount: number;
  currency: string;
  paymentDate: string; // ISO date string
  paymentMethod: string;
  status: string;
  externalTransactionId: string;
}

/**
 * Response interface for Transaction API responses.
 * Contains an array of Transaction resources.
 */
export interface TransactionResponse extends BaseResponse {
  transactions: TransactionResource[];
}
