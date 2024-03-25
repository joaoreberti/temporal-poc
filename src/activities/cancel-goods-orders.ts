import { ActivityResult } from './';

export function cancelGoodsOrders(
  orderNumber: string,
): Promise<ActivityResult> {
  // In a real application, this would query WMS service to get active goods orders
  return Promise.resolve({
    success: true,
    successes: [`${orderNumber}1`, `${orderNumber}2`, `${orderNumber}3`],
    noop: [`${orderNumber}4`, `${orderNumber}5`, `${orderNumber}6`],
    failures: [`${orderNumber}7`, `${orderNumber}8`, `${orderNumber}9`],
  });
}
