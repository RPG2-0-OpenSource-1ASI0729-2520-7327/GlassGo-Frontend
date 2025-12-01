import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a transaction entity with its details.
 * @implements BaseEntity
 */
export class Transaction implements BaseEntity {
  private _id: number;
  private _subscriptionId: number;
  private _amount: number;
  private _currency: string;
  private _paymentDate: Date;
  private _paymentMethod: string;
  private _status: string;
  private _externalTransactionId: string;

  /**
   * Creates an instance of {@link Transaction}.
   * @param transaction - An object containing transaction details.
   * @param transaction.id - The unique identifier of the transaction.
   * @param transaction.subscriptionId - The identifier of the associated subscription.
   * @param transaction.amount - The amount of the transaction.
   * @param transaction.currency - The currency of the transaction.
   * @param transaction.paymentDate - The date of the payment.
   * @param transaction.paymentMethod - The method of payment used.
   * @param transaction.status - The status of the transaction.
   * @param transaction.externalTransactionId - The external transaction identifier.
   */
  constructor(transaction: {
    id: number,
    subscriptionId: number,
    amount: number,
    currency: string,
    paymentDate: Date,
    paymentMethod: string,
    status: string,
    externalTransactionId: string
  }) {
    this._id = transaction.id;
    this._subscriptionId = transaction.subscriptionId;
    this._amount = transaction.amount;
    this._currency = transaction.currency;
    this._paymentDate = transaction.paymentDate;
    this._paymentMethod = transaction.paymentMethod;
    this._status = transaction.status;
    this._externalTransactionId = transaction.externalTransactionId;
  }

  /**
   * Gets the unique identifier of the transaction.
   * @returns The transaction ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the unique identifier of the transaction.
   * @param value - The transaction ID.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the identifier of the associated subscription.
   * @returns The subscription ID.
   */
  get subscriptionId(): number {
    return this._subscriptionId;
  }

  /**
   * Sets the identifier of the associated subscription.
   * @param value - The subscription ID.
   */
  set subscriptionId(value: number) {
    this._subscriptionId = value;
  }

  /**
   * Gets the amount of the transaction.
   * @returns The transaction amount.
   */
  get amount(): number {
    return this._amount;
  }

  /**
   * Sets the amount of the transaction.
   * @param value - The transaction amount.
   */
  set amount(value: number) {
    this._amount = value;
  }

  /**
   * Gets the currency of the transaction.
   * @returns The transaction currency.
   */
  get currency(): string {
    return this._currency;
  }

  /**
   * Sets the currency of the transaction.
   * @param value - The transaction currency.
   */
  set currency(value: string) {
    this._currency = value;
  }

  /**
   * Gets the date of the payment.
   * @returns The payment date.
   */
  get paymentDate(): Date {
    return this._paymentDate;
  }

  /**
   * Sets the date of the payment.
   * @param value - The payment date.
   */
  set paymentDate(value: Date) {
    this._paymentDate = value;
  }

  /**
   * Gets the method of payment used.
   * @returns The payment method.
   */
  get paymentMethod(): string {
    return this._paymentMethod;
  }

  /**
   * Sets the method of payment used.
   * @param value - The payment method.
   */
  set paymentMethod(value: string) {
    this._paymentMethod = value;
  }

  /**
   * Gets the status of the transaction.
   * @returns The transaction status.
   */
  get status(): string {
    return this._status;
  }

  /**
   * Sets the status of the transaction.
   * @param value - The transaction status.
   */
  set status(value: string) {
    this._status = value;
  }

  /**
   * Gets the external transaction identifier.
   * @returns The external transaction ID.
   */
  get externalTransactionId(): string {
    return this._externalTransactionId;
  }

  /**
   * Sets the external transaction identifier.
   * @param value - The external transaction ID.
   */
  set externalTransactionId(value: string) {
    this._externalTransactionId = value;
  }
}
