import {Routes} from '@angular/router';

const paymentsHistory = () => import('./views/payments-history/payments-history').then(m => m.PaymentsHistory);

/**
 * Routes for the Payments feature module.
 * Defines paths for payments and subscriptions management.
 */
export const paymentsRoutes: Routes =  [
  { path: 'transactions', loadComponent: paymentsHistory }
];
