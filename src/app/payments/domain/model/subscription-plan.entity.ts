import {BaseEntity} from '../../../shared/domain/model/base-entity';

/**
 * Represents a subscription plan entity with its details.
 * @implements BaseEntity
 */
export class SubscriptionPlan implements BaseEntity {
  private _id: number;
  private _name: string;
  private _description: string;
  private _price: number;
  private _durationInMonths: number;

  /**
   * Creates an instance of {@link SubscriptionPlan}.
   * @param subscriptionPlan - An object containing subscription plan details.
   * @param subscriptionPlan.id - The unique identifier of the subscription plan.
   * @param subscriptionPlan.name - The name of the subscription plan.
   * @param subscriptionPlan.description - The description of the subscription plan.
   * @param subscriptionPlan.price - The price of the subscription plan.
   * @param subscriptionPlan.durationInMonths - The duration of the subscription plan in months.
   */
  constructor(subscriptionPlan: {
    id: number,
    name: string,
    description: string,
    price: number,
    durationInMonths: number
  }) {
    this._id = subscriptionPlan.id;
    this._name = subscriptionPlan.name;
    this._description = subscriptionPlan.description;
    this._price = subscriptionPlan.price;
    this._durationInMonths = subscriptionPlan.durationInMonths;
  }

  /**
   * Gets the unique identifier of the subscription plan.
   * @returns The subscription plan ID.
   */
  get id(): number {
    return this._id;
  }

  /**
   * Sets the unique identifier of the subscription plan.
   * @param value - The subscription plan ID.
   */
  set id(value: number) {
    this._id = value;
  }

  /**
   * Gets the name of the subscription plan.
   * @returns The subscription plan name.
   */
  get name(): string {
    return this._name;
  }

  /**
   * Sets the name of the subscription plan.
   * @param value - The subscription plan name.
   */
  set name(value: string) {
    this._name = value;
  }

  /**
   * Gets the description of the subscription plan.
   * @returns The subscription plan description.
   */
  get description(): string {
    return this._description;
  }

  /**
   * Sets the description of the subscription plan.
   * @param value - The subscription plan description.
   */
  set description(value: string) {
    this._description = value;
  }

  /**
   * Gets the price of the subscription plan.
   * @returns The subscription plan price.
   */
  get price(): number {
    return this._price;
  }

  /**
   * Sets the price of the subscription plan.
   * @param value - The subscription plan price.
   */
  set price(value: number) {
    this._price = value;
  }

  /**
   * Gets the duration of the subscription plan in months.
   * @returns The subscription plan duration in months.
   */
  get durationInMonths(): number {
    return this._durationInMonths;
  }

  /**
   * Sets the duration of the subscription plan in months.
   * @param value - The subscription plan duration in months.
   */
  set durationInMonths(value: number) {
    this._durationInMonths = value;
  }
}
