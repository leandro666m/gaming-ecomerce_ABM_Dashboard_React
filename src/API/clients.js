import { request } from './request';

export function fetchClients() {
  return request('/clients');
}

export function createClient(values) {
  return request('/clients', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
