import {computed, Injectable, Signal, signal} from '@angular/core';
import {PaymentGateway} from '../domain/model/payment-gateway.entity';
import {Subscription} from '../domain/model/subscription.entity';
import {SubscriptionPlan} from '../domain/model/subscription-plan.entity';
import {Transaction} from '../domain/model/transaction.entity';
import {PaymentsApi} from '../infrastructure/payments-api';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {retry} from 'rxjs';

/**
 * Store for managing the state of payments-related resources.
 * Uses Angular signals for reactive state management and provides methods for CRUD operations.
 */
@Injectable({ providedIn: 'root' })
export class PaymentsStore {
  // State signals
  private readonly paymentGatewaysSignal = signal<PaymentGateway[]>([]);
  private readonly subscriptionsSignal = signal<Subscription[]>([]);
  private readonly subscriptionPlansSignal = signal<SubscriptionPlan[]>([]);
  private readonly transactionsSignal = signal<Transaction[]>([]);
  private readonly errorSignal = signal<string | null>(null);
  private readonly loadingSignal = signal<boolean>(false);

  // Readonly signals
  readonly paymentGateways = this.paymentGatewaysSignal.asReadonly();
  readonly subscriptions = this.subscriptionsSignal.asReadonly();
  readonly subscriptionPlans = this.subscriptionPlansSignal.asReadonly();
  readonly transactions = this.transactionsSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();

  // Computed signals
  readonly paymentGatewaysCount = computed(() => this.paymentGateways.length);
  readonly subscriptionsCount = computed(() => this.subscriptions.length);
  readonly subscriptionPlansCount = computed(() => this.subscriptionPlans.length);
  readonly transactionsCount = computed(() => this.transactions.length);

  /**
   * Constructor to initialize the PaymentsStore and load initial data.
   * @param paymentsApi - The PaymentsApi service for making API calls.
   */
  constructor(private paymentsApi: PaymentsApi) {
    this.loadPaymentGateways();
    this.loadSubscriptions();
    this.loadSubscriptionPlans();
    this.loadTransactions();
  }

  /**
   * Get a payment gateway by its ID as a computed signal.
   * @param id - The ID of the payment gateway.
   * @returns A signal that emits the payment gateway or undefined if not found.
   */
  getPaymentGatewayById(id: number | null | undefined): Signal<PaymentGateway | undefined> {
    return computed(() => id ? this.paymentGateways().find(x => x.id === id) : undefined);
  }

  /**
   * Get a subscription by its ID as a computed signal.
   * @param id - The ID of the subscription.
   * @returns A signal that emits the subscription or undefined if not found.
   */
  getSubscriptionById(id: number | null | undefined): Signal<Subscription | undefined> {
    return computed(() => id ? this.subscriptions().find(x => x.id === id) : undefined);
  }

  /**
   * Get a subscription plan by its ID as a computed signal.
   * @param id - The ID of the subscription plan.
   * @returns A signal that emits the subscription plan or undefined if not found.
   */
  getSubscriptionPlanById(id: number | null | undefined): Signal<SubscriptionPlan | undefined> {
    return computed(() => id ? this.subscriptionPlans().find(x => x.id === id) : undefined);
  }

  /**
   * Get a transaction by its ID as a computed signal.
   * @param id - The ID of the transaction.
   * @returns A signal that emits the transaction or undefined if not found.
   */
  getTransactionById(id: number | null | undefined): Signal<Transaction | undefined> {
    return computed(() => id ? this.transactions().find(x => x.id === id) : undefined);
  }

  /**
   * Add a new payment gateway.
   * @param paymentGateway - The payment gateway to add.
   */
  addPaymentGateway(paymentGateway: PaymentGateway): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.createPaymentGateway(paymentGateway).pipe(retry(2)).subscribe({
      next: createdPaymentGateway => {
        this.paymentGatewaysSignal.update(pg => [...pg, createdPaymentGateway]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create payment gateway'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Add a new subscription.
   * @param subscription - The subscription to add.
   */
  addSubscription(subscription: Subscription): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.createSubscription(subscription).pipe(retry(2)).subscribe({
      next: createdSubscription => {
        this.subscriptionsSignal.update(s => [...s, createdSubscription]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create subscription'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Add a new subscription plan.
   * @param subscriptionPlan - The subscription plan to add.
   */
  addSubscriptionPlan(subscriptionPlan: SubscriptionPlan): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.createSubscriptionPlan(subscriptionPlan).pipe(retry(2)).subscribe({
      next: createdSubscriptionPlan => {
        this.subscriptionPlansSignal.update(sp => [...sp, createdSubscriptionPlan]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create subscription plan'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Add a new transaction.
   * @param transaction - The transaction to add.
   */
  addTransaction(transaction: Transaction): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.createTransaction(transaction).pipe(retry(2)).subscribe({
      next: createdTransaction => {
        this.transactionsSignal.update(t => [...t, createdTransaction]);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to create transaction'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Update an existing payment gateway.
   * @param updatedPaymentGateway - The payment gateway with updated data.
   */
  updatePaymentGateway(updatedPaymentGateway: PaymentGateway): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.updatePaymentGateway(updatedPaymentGateway).pipe(retry(2)).subscribe({
      next: paymentGateway => {
        this.paymentGatewaysSignal.update(pgs => pgs.map(pg => pg.id === paymentGateway.id ? paymentGateway : pg));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update payment gateway'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Update an existing subscription.
   * @param updatedSubscription - The subscription with updated data.
   */
  updateSubscription(updatedSubscription: Subscription): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.updateSubscription(updatedSubscription).pipe(retry(2)).subscribe({
      next: subscription => {
        this.subscriptionsSignal.update(ss => ss.map(s => s.id === subscription.id ? subscription : s));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update subscription'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Update an existing subscription plan.
   * @param updatedSubscriptionPlan - The subscription plan with updated data.
   */
  updateSubscriptionPlan(updatedSubscriptionPlan: SubscriptionPlan): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.updateSubscriptionPlan(updatedSubscriptionPlan).pipe(retry(2)).subscribe({
      next: subscriptionPlan => {
        this.subscriptionPlansSignal.update(sps => sps.map(sp => sp.id === subscriptionPlan.id ? subscriptionPlan : sp));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update subscription plan'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Update an existing transaction.
   * @param updatedTransaction - The transaction with updated data.
   */
  updateTransaction(updatedTransaction: Transaction): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.updateTransaction(updatedTransaction).pipe(retry(2)).subscribe({
      next: transaction => {
        this.transactionsSignal.update(ts => ts.map(t => t.id === transaction.id ? transaction : t));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to update transaction'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Delete a payment gateway by its ID.
   * @param id - The ID of the payment gateway to delete.
   */
  deletePaymentGateway(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.deletePaymentGateway(id).pipe(retry(2)).subscribe({
      next: () => {
        this.paymentGatewaysSignal.update(pgs => pgs.filter(pg => pg.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete payment gateway'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Delete a subscription by its ID.
   * @param id - The ID of the subscription to delete.
   */
  deleteSubscription(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.deleteSubscription(id).pipe(retry(2)).subscribe({
      next: () => {
        this.subscriptionsSignal.update(ss => ss.filter(s => s.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete subscription'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Delete a subscription plan by its ID.
   * @param id - The ID of the subscription plan to delete.
   */
  deleteSubscriptionPlan(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.deleteSubscriptionPlan(id).pipe(retry(2)).subscribe({
      next: () => {
        this.subscriptionPlansSignal.update(sps => sps.filter(sp => sp.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete subscription plan'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Delete a transaction by its ID.
   * @param id - The ID of the transaction to delete.
   */
  deleteTransaction(id: number): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.deleteTransaction(id).pipe(retry(2)).subscribe({
      next: () => {
        this.transactionsSignal.update(ts => ts.filter(t => t.id !== id));
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to delete transaction'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads payment gateways from the API.
   * @private
   */
  private loadPaymentGateways(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.getPaymentGateways().pipe(takeUntilDestroyed()).subscribe({
      next: paymentGateways => {
        this.paymentGatewaysSignal.set(paymentGateways);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load payment gateways'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads subscriptions from the API.
   * @private
   */
  private loadSubscriptions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.getSubscriptions().pipe(takeUntilDestroyed()).subscribe({
      next: subscriptions => {
        this.subscriptionsSignal.set(subscriptions);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load subscriptions'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads subscription plans from the API.
   * @private
   */
  private loadSubscriptionPlans(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.getSubscriptionPlans().pipe(takeUntilDestroyed()).subscribe({
      next: subscriptionPlans => {
        this.subscriptionPlansSignal.set(subscriptionPlans);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load subscription plans'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Loads transactions from the API.
   * @private
   */
  private loadTransactions(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.paymentsApi.getTransactions().pipe(takeUntilDestroyed()).subscribe({
      next: transactions => {
        this.transactionsSignal.set(transactions);
        this.loadingSignal.set(false);
      },
      error: err => {
        this.errorSignal.set(this.formatError(err, 'Failed to load transactions'));
        this.loadingSignal.set(false);
      }
    });
  }

  /**
   * Formats an error message based on the error object and a fallback message.
   * @param error - The error object.
   * @param fallback - The fallback message to use if the error cannot be parsed.
   * @private
   * @returns The formatted error message.
   */
  private formatError(error: any, fallback: string): string {
    if (error instanceof Error)
      return error.message.includes('Resource not found') ? `${fallback}: Not Found` : error.message;
    return fallback;
  }
}
