import { request } from './client';

export function fetchUsers() {
  return request('/users');
}

export function createUser(values) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
