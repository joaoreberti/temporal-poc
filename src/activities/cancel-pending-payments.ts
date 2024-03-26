import { Context } from '@temporalio/activity';
import { sendMessage } from '../kafka/producer/publish-message';
import { ActivityResult } from './';

export async function cancelPendingPayments(orderNumber: string): Promise<ActivityResult> {
  // In a real application, this try to cancel pending payments

  const workflowId = Context.current().info.workflowExecution.workflowId;
  console.log(`Cancelling pending payments for order ${orderNumber} with workflowId: ${workflowId}`);
  await sendMessage(workflowId);
  return Promise.resolve({
    success: true,
    successes: [`${orderNumber}1`, `${orderNumber}2`, `${orderNumber}3`],
    noop: [`${orderNumber}4`, `${orderNumber}5`, `${orderNumber}6`],
    failures: [`${orderNumber}7`, `${orderNumber}8`, `${orderNumber}9`],
  });
}
