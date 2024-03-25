import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from '../activities';
import { WorkflowResult } from './';

const { cancelGoodsOrders, cancelPendingPayments } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function cancelOrder(
  orderNumber: string,
): Promise<WorkflowResult> {
  // check if there are active goods orders

  const { success } = await cancelGoodsOrders(orderNumber);

  if (!success) {
    throw new Error(`Failed to cancel goods orders for ${orderNumber}`);
  }

  const { success: success2 } = await cancelPendingPayments(orderNumber);

  if (!success2) {
    throw new Error(`Failed to cancel pending payments for ${orderNumber}`);
  }

  if (success && success2) {
    console.log(`Order ${orderNumber} was successfully cancelled`);

    return { success: true };
  }
  return { success: false };
}
