export { cancelGoodsOrders } from './cancel-goods-orders';
export { cancelPendingPayments } from './cancel-pending-payments';

export type ActivityResult = {
  success: boolean;
  successes: string[];
  noop: string[];
  failures: string[];
};
