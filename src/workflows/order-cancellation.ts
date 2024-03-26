import { CancelledFailure, condition, log, proxyActivities, setHandler } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from '../activities';
import { WorkflowResult } from './';
import { cancelPendingPaymentsSignal } from './signals/cancel-pending-payments-signal';

const { cancelGoodsOrders, cancelPendingPayments } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** A workflow that simply calls an activity */
export async function cancelOrder(orderNumber: string): Promise<WorkflowResult> {
  const orderCancellationState = {
    orderNumber,
    goodsOrdersCancelled: false,
    paymentsCancelled: false,
  };

  // sync  - we wait for graphql/server response for goods orders cancellation
  const { success: goodsOrderCancellationResult } = await cancelGoodsOrders(orderNumber);

  orderCancellationState.goodsOrdersCancelled = goodsOrderCancellationResult;

  // async - we send a message to kafka to cancel pending payments and react later
  // in this case we are using a signal to react to the kafka message
  // and the consumer is in the same repository
  const { success: cancelPendingPaymentsInitiated } = await cancelPendingPayments(orderNumber);

  if (!cancelPendingPaymentsInitiated) {
    throw new Error(`Failed to initiate cancel pending payments for ${orderNumber}`);
  }

  // async
  let paymentsCancelled = false;
  setHandler(cancelPendingPaymentsSignal, () => void (paymentsCancelled = true));
  try {
    await condition(() => paymentsCancelled);
    log.info('successfully cancelled pending payments');
  } catch (err) {
    if (err instanceof CancelledFailure) {
      log.info('Cancelled');
    }
    throw err;
  }

  if (!goodsOrderCancellationResult && paymentsCancelled) {
    log.info(`Order ${orderNumber} was successfully cancelled`);

    return { success: true };
  }
  log.error(`Order ${orderNumber} failed to be cancelled`);
  return { success: false };
}
