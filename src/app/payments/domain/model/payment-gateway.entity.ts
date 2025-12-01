import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a payment gateway entity with its configuration details.
 * @implements BaseEntity
 */
export class PaymentGateway implements BaseEntity {
  private _id: number;
  private _name: string;
  private _apiUrl: string;
  private _clientId: number;
  private _secretKey: string;

  /**
   * Creates an instance of {@link PaymentGateway}.
   * @param paymentGateway - An object containing payment gateway details.
   * @param paymentGateway.id - The unique identifier of the payment gateway.
   * @param paymentGateway.name - The name of the payment gateway.
   * @param paymentGateway.apiUrl - The API URL of the payment gateway.
   * @param paymentGateway.clientId - The client ID for authentication.
   * @param paymentGateway.secretKey - The secret key for authentication.
   */
  constructor(paymentGateway: {
    id: number,
    name: string,
    apiUrl: string,
    clientId: number,
    secretKey: string
  }) {
    this._id = paymentGateway.id;
    this._name = paymentGateway.name;
    this._apiUrl = paymentGateway.apiUrl;
    this._clientId = paymentGateway.clientId;
    this._secretKey = paymentGateway.secretKey;
  }

  /**
   * Gets the unique identifier of the payment gateway.
   * @returns The payment gateway ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the unique identifier of the payment gateway.
   * @param value - The payment gateway ID.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the name of the payment gateway.
   * @returns The payment gateway name.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the payment gateway.
   * @param value - The payment gateway name.
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Gets the API URL of the payment gateway.
   * @returns The payment gateway API URL.
   */
  get apiUrl(): string {
    return this._apiUrl;
  }

  /**
   * Sets the API URL of the payment gateway.
   * @param value - The payment gateway API URL.
   */
  set apiUrl(value: string) {
    this._apiUrl = value;
  }

  /**
   * Gets the client ID for authentication.
   * @returns The client ID.
   */
  get clientId(): number {
    return this._clientId;
  }

  /**
   * Sets the client ID for authentication.
   * @param value - The client ID.
   */
  set clientId(value: number) {
    this._clientId = value;
  }

  /**
   * Gets the secret key for authentication.
   * @returns The secret key.
   */
  get secretKey(): string {
    return this._secretKey;
  }

  /**
   * Sets the secret key for authentication.
   * @param value - The secret key.
   */
  set secretKey(value: string) {
    this._secretKey = value;
  }
}
