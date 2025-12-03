import {BaseApiEndpoint} from '../../shared/infrastructure/base-api-endpoint';
import {Transaction} from '../domain/model/transaction.entity';
import {TransactionResource, TransactionResponse} from './transaction-response';
import {TransactionAssembler} from './transaction-assembler';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

const transactionsEndpointUrl = `${environment.platformProviderApiBaseUrl}${environment.platformProviderTransactionsEndpointPath}`;

/**
 * API endpoint for managing transaction related operations.
 * Extends the BaseApiEndpoint to provide CRUD operations for Transaction entities.
 */
export class TransactionsApiEndpoint extends BaseApiEndpoint<Transaction, TransactionResource, TransactionResponse, TransactionAssembler> {
  /**
   * Creates an instance of TransactionsApiEndpoint.
   * @param http - The HttpClient used for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super(http, transactionsEndpointUrl, new TransactionAssembler());
  }
}
