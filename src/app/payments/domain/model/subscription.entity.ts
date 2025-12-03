import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a subscription entity with its details.
 * @implements BaseEntity
 */
export class Subscription implements BaseEntity {
  private _id: number;
  private _userId: number;
  private _planId: number;
  private _status: string;
  private _startDate: Date;
  private _endDate: Date;
  private _autoRenew: boolean;

  /**
   * Creates an instance of {@link Subscription}.
   * @param subscription - An object containing subscription details.
   * @param subscription.id - The unique identifier of the subscription.
   * @param subscription.userId - The identifier of the user associated with the subscription.
   * @param subscription.planId - The identifier of the subscription plan.
   * @param subscription.status - The current status of the subscription.
   * @param subscription.startDate - The start date of the subscription.
   * @param subscription.endDate - The end date of the subscription.
   * @param subscription.autoRenew - Indicates if the subscription is set to auto-renew.
   */
  constructor(subscription: {
    id: number,
    userId: number,
    planId: number,
    status: string,
    startDate: Date,
    endDate: Date,
    autoRenew: boolean
  }) {
    this._id = subscription.id;
    this._userId = subscription.userId;
    this._planId = subscription.planId;
    this._status = subscription.status;
    this._startDate = subscription.startDate;
    this._endDate = subscription.endDate;
    this._autoRenew = subscription.autoRenew;
  }

  /**
   * Gets the unique identifier of the subscription.
   * @returns The subscription ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the unique identifier of the subscription.
   * @param value - The subscription ID.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the user identifier associated with the subscription.
   * @returns The user ID.
   */
  get userId(): number {
    return this._userId;
  }

  /**
   * Sets the user identifier associated with the subscription.
   * @param value - The user ID.
   */
  set userId(value: number) {
    this._userId = value;
  }

  /**
   * Gets the subscription plan identifier.
   * @returns The plan ID.
   */
  get planId(): number {
    return this._planId;
  }

  /**
   * Sets the subscription plan identifier.
   * @param value - The plan ID.
   */
  set planId(value: number) {
    this._planId = value;
  }

  /**
   * Gets the current status of the subscription.
   * @returns The subscription status.
   */
  get status(): string {
    return this._status;
  }

  /**
   * Sets the current status of the subscription.
   * @param value - The subscription status.
   */
  set status(value: string) {
    this._status = value;
  }

  /**
   * Gets the start date of the subscription.
   * @returns The start date.
   */
  get startDate(): Date {
    return this._startDate;
  }

  /**
   * Sets the start date of the subscription.
   * @param value - The start date.
   */
  set startDate(value: Date) {
    this._startDate = value;
  }

  /**
   * Gets the end date of the subscription.
   * @returns The end date.
   */
  get endDate(): Date {
    return this._endDate;
  }

  /**
   * Sets the end date of the subscription.
   * @param value - The end date.
   */
  set endDate(value: Date) {
    this._endDate = value;
  }

  /**
   * Gets whether the subscription is set to auto-renew.
   * @returns True if auto-renew is enabled, false otherwise.
   */
  get autoRenew(): boolean {
    return this._autoRenew;
  }

  /**
   * Sets whether the subscription is set to auto-renew.
   * @param value - True to enable auto-renew, false to disable.
   */
  set autoRenew(value: boolean) {
    this._autoRenew = value;
  }
}
