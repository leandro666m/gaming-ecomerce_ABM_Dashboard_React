import { request } from './request';

export function normalizeGamePayload(values) {
  return {
    ...values,
    price: Number(values.price),
    discount: Number(values.discount || 0),
    platformId: Number(values.platformId),
    screenshots: values.screenshots ? values.screenshots.split('\n').filter(Boolean) : [],
  };
}

export async function fetchGames() {
  return request('/games');
}

export async function createGame(values) {
  const payload = normalizeGamePayload(values);

  return request(`/platforms/${payload.platformId}/games`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function editGame(values) {
  const payload = normalizeGamePayload(values);

  return request(`/games/${payload.id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export function deleteGame(id) {
  return request(`/games/${id}`, { method: 'DELETE' });
}
