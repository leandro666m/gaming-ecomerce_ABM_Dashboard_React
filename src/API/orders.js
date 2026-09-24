import { request } from './request';

export function fetchOrders() {
  return request('/orders');
}
