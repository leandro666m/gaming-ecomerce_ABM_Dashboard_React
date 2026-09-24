import { request } from './client';

export function fetchPlatforms() {
  return request('/platforms');
}

export function createPlatform(values) {
  return request('/platforms', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function deletePlatform(id) {
  return request(`/platforms/${id}`, { method: 'DELETE' });
}
