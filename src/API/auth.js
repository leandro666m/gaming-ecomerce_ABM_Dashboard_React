import { request, setCsrfToken } from './request';

export async function fetchCsrfToken() {
  const csrf = await request('/auth/csrf');
  setCsrfToken(csrf.token);
  return csrf;
}

export function fetchCurrentUser() {
  return request('/auth/me');
}

export async function login(credentials) {
  await fetchCsrfToken();
  const user = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  await fetchCsrfToken();
  return user;
}

export function logout() {
  return request('/auth/logout', { method: 'POST' }).then(() => setCsrfToken(''));
}
