import { ActivityResult } from './';

export function cancelPendingPayments(
  orderNumber: string,
): Promise<ActivityResult> {
  // In a real application, this try to cancel pending payments

  return Promise.resolve({
    success: true,
    successes: [`${orderNumber}1`, `${orderNumber}2`, `${orderNumber}3`],
    noop: [`${orderNumber}4`, `${orderNumber}5`, `${orderNumber}6`],
    failures: [`${orderNumber}7`, `${orderNumber}8`, `${orderNumber}9`],
  });
}
