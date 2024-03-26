import { defineSignal } from '@temporalio/workflow';

// Define a signal for cancelling pending payments
export const cancelPendingPaymentsSignal = defineSignal('cancelPendingPaymentsSignal');
