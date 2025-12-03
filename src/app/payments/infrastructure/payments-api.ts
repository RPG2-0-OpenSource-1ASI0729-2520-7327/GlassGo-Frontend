import {BaseApi} from '../../shared/infrastructure/base-api';
import {Injectable} from '@angular/core';
import {PaymentGatewaysApiEndpoint} from './payment-gateways-api-endpoint';
import {SubscriptionsApiEndpoint} from './subscriptions-api-endpoint';
import {SubscriptionPlansApiEndpoint} from './subscription-plans-api-endpoint';
import {TransactionsApiEndpoint} from './transactions-api-endpoint';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaymentGateway} from '../domain/model/payment-gateway.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionPlan} from '../domain/model/subscription-plan.entity';
import {Transaction} from '../domain/model/transaction.entity';

/**
 * Payments API service to interact with payment-related endpoints.
 * Provides methods to manage payment gateways, subscriptions, subscription plans, and transactions.
 */
@Injectable({ providedIn: 'root' })
export class PaymentsApi extends BaseApi {
  private readonly paymentGatewaysEndpoint: PaymentGatewaysApiEndpoint;
  private readonly subscriptionsEndpoint: SubscriptionsApiEndpoint;
  private readonly subscriptionPlansEndpoint: SubscriptionPlansApiEndpoint;
  private readonly transactionsEndpoint: TransactionsApiEndpoint;

  /**
   * Constructor to initialize the PaymentsApi with necessary endpoints.
   * @param http - The HttpClient instance for making HTTP requests.
   */
  constructor(http: HttpClient) {
    super();
    this.paymentGatewaysEndpoint = new PaymentGatewaysApiEndpoint(http);
    this.subscriptionsEndpoint = new SubscriptionsApiEndpoint(http);
    this.subscriptionPlansEndpoint = new SubscriptionPlansApiEndpoint(http);
    this.transactionsEndpoint = new TransactionsApiEndpoint(http);
  }

  /**
   * Fetch all payment gateways.
   * @returns An Observable of an array of PaymentGateway entities.
   */
  getPaymentGateways(): Observable<PaymentGateway[]> {
    return this.paymentGatewaysEndpoint.getAll();
  }

  /**
   * Fetch all subscriptions.
   * @returns An Observable of an array of Subscription entities.
   */
  getSubscriptions(): Observable<Subscription[]> {
    return this.subscriptionsEndpoint.getAll();
  }

  /**
   * Fetch all subscription plans.
   * @returns An Observable of an array of SubscriptionPlan entities.
   */
  getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
    return this.subscriptionPlansEndpoint.getAll();
  }

  /**
   * Fetch all transactions.
   * @returns An Observable of an array of Transaction entities.
   */
  getTransactions(): Observable<Transaction[]> {
    return this.transactionsEndpoint.getAll();
  }

  /**
   * Fetch a payment gateway by its ID.
   * @param id - The ID of the payment gateway.
   * @returns An Observable of the PaymentGateway entity.
   */
  getPaymentGateway(id: number): Observable<PaymentGateway> {
    return this.paymentGatewaysEndpoint.getById(id);
  }

  /**
   * Fetch a subscription by its ID.
   * @param id - The ID of the subscription.
   * @returns An Observable of the Subscription entity.
   */
  getSubscription(id: number): Observable<Subscription> {
    return this.subscriptionsEndpoint.getById(id);
  }

  /**
   * Fetch a subscription plan by its ID.
   * @param id - The ID of the subscription plan.
   * @returns An Observable of the SubscriptionPlan entity.
   */
  getSubscriptionPlan(id: number): Observable<SubscriptionPlan> {
    return this.subscriptionPlansEndpoint.getById(id);
  }

  /**
   * Fetch a transaction by its ID.
   * @param id - The ID of the transaction.
   * @returns An Observable of the Transaction entity.
   */
  getTransaction(id: number): Observable<Transaction> {
    return this.transactionsEndpoint.getById(id);
  }

  /**
   * Create a new payment gateway.
   * @param paymentGateway - The PaymentGateway entity to create.
   * @returns An Observable of the created PaymentGateway entity.
   */
  createPaymentGateway(paymentGateway: PaymentGateway): Observable<PaymentGateway> {
    return this.paymentGatewaysEndpoint.create(paymentGateway);
  }

  /**
   * Create a new subscription.
   * @param subscription - The Subscription entity to create.
   * @returns An Observable of the created Subscription entity.
   */
  createSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionsEndpoint.create(subscription);
  }

  /**
   * Create a new subscription plan.
   * @param subscriptionPlan - The SubscriptionPlan entity to create.
   * @returns An Observable of the created SubscriptionPlan entity.
   */
  createSubscriptionPlan(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
    return this.subscriptionPlansEndpoint.create(subscriptionPlan);
  }

  /**
   * Create a new transaction.
   * @param transaction - The Transaction entity to create.
   * @returns An Observable of the created Transaction entity.
   */
  createTransaction(transaction: Transaction): Observable<Transaction> {
    return this.transactionsEndpoint.create(transaction);
  }

  /**
   * Update an existing payment gateway.
   * @param paymentGateway - The PaymentGateway entity to update.
   * @returns An Observable of the updated PaymentGateway entity.
   */
  updatePaymentGateway(paymentGateway: PaymentGateway): Observable<PaymentGateway> {
    return this.paymentGatewaysEndpoint.update(paymentGateway, paymentGateway.id);
  }

  /**
   * Update an existing subscription.
   * @param subscription - The Subscription entity to update.
   * @returns An Observable of the updated Subscription entity.
   */
  updateSubscription(subscription: Subscription): Observable<Subscription> {
    return this.subscriptionsEndpoint.update(subscription, subscription.id);
  }

  /**
   * Update an existing subscription plan.
   * @param subscriptionPlan - The SubscriptionPlan entity to update.
   * @returns An Observable of the updated SubscriptionPlan entity.
   */
  updateSubscriptionPlan(subscriptionPlan: SubscriptionPlan): Observable<SubscriptionPlan> {
    return this.subscriptionPlansEndpoint.update(subscriptionPlan, subscriptionPlan.id);
  }

  /**
   * Update an existing transaction.
   * @param transaction - The Transaction entity to update.
   * @returns An Observable of the updated Transaction entity.
   */
  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.transactionsEndpoint.update(transaction, transaction.id);
  }

  /**
   * Delete a payment gateway by its ID.
   * @param id - The ID of the payment gateway to delete.
   * @returns An Observable of void.
   */
  deletePaymentGateway(id: number): Observable<void> {
    return this.paymentGatewaysEndpoint.delete(id);
  }

  /**
   * Delete a subscription by its ID.
   * @param id - The ID of the subscription to delete.
   * @returns An Observable of void.
   */
  deleteSubscription(id: number): Observable<void> {
    return this.subscriptionsEndpoint.delete(id);
  }

  /**
   * Delete a subscription plan by its ID.
   * @param id - The ID of the subscription plan to delete.
   * @returns An Observable of void.
   */
  deleteSubscriptionPlan(id: number): Observable<void> {
    return this.subscriptionPlansEndpoint.delete(id);
  }

  /**
   * Delete a transaction by its ID.
   * @param id - The ID of the transaction to delete.
   * @returns An Observable of void.
   */
  deleteTransaction(id: number): Observable<void> {
    return this.transactionsEndpoint.delete(id);
  }
}
