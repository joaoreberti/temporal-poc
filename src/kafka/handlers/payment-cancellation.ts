import { WorkflowClient } from '@temporalio/client';

export async function paymentCancellationHandler(msg: any) {
  // Extract the workflowId from the message
  const value = JSON.parse(msg.value);
  const workflowId = value.workflowId;
  console.log(`Received message with workflowId: ${workflowId}`, msg.value);

  // Create a Temporal client
  const client = new WorkflowClient();

  // Get a handle to the workflow instance
  const workflow = client.getHandle(workflowId);

  // Emit the signal
  await workflow.signal('cancelPendingPaymentsSignal');
}
