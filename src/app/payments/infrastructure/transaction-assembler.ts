import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Transaction} from '../domain/model/transaction.entity';
import {TransactionResource, TransactionResponse} from './transaction-response';

/**
 * Assembler class for converting between Transaction entities and resources/responses.
 * Implements methods to transform data for API communication.
 */
export class TransactionAssembler implements BaseAssembler<Transaction, TransactionResource, TransactionResponse> {
  /**
   * Converts a TransactionResource to a Transaction entity.
   * @param resource - The TransactionResource to convert.
   * @returns The corresponding Transaction entity.
   */
  toEntityFromResource(resource: TransactionResource): Transaction {
    return new Transaction({
      id: resource.id,
      subscriptionId: resource.subscriptionId,
      amount: resource.amount,
      currency: resource.currency,
      paymentDate: new Date(resource.paymentDate),
      paymentMethod: resource.paymentMethod,
      status: resource.status,
      externalTransactionId: resource.externalTransactionId
    });
  }

  /**
   * Converts a TransactionResponse to an array of Transaction entities.
   * @param response - The TransactionResponse to convert.
   * @returns An array of corresponding Transaction entities.
   */
  toEntitiesFromResponse(response: TransactionResponse): Transaction[] {
    return response.transactions.map(resource => this.toEntityFromResource(resource as TransactionResource));
  }

  /**
   * Converts a Transaction entity to a TransactionResource.
   * @param entity - The Transaction entity to convert.
   * @returns The corresponding TransactionResource.
   */
  toResourceFromEntity(entity: Transaction): TransactionResource {
    return {
      id: entity.id,
      subscriptionId: entity.subscriptionId,
      amount: entity.amount,
      currency: entity.currency,
      paymentDate: entity.paymentDate.toISOString(),
      paymentMethod: entity.paymentMethod,
      status: entity.status,
      externalTransactionId: entity.externalTransactionId
    };
  }
}
