import { request } from './client';

export function fetchOrders() {
  return request('/orders');
}
