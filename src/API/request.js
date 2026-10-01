const API_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = API_URL;

let csrfTokenInMemory = '';

export function setCsrfToken(token) {
  csrfTokenInMemory = token || '';
}

function getCsrfToken() {
  if (csrfTokenInMemory) return csrfTokenInMemory;
  const cookie = document.cookie
    .split('; ')
    .find((value) => value.startsWith('XSRF-TOKEN='));

  return cookie ? decodeURIComponent(cookie.slice('XSRF-TOKEN='.length)) : '';
}

export async function request(path, options) {
  const method = options?.method || 'GET';
  const headers = { 'Content-Type': 'application/json', ...(options?.headers || {}) };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method.toUpperCase())) {
    const csrfToken = getCsrfToken();
    if (csrfToken) headers['X-XSRF-TOKEN'] = csrfToken;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers,
  });

  if (!response.ok) {
    const error = new Error(`API ${response.status}: ${response.statusText}`);
    error.status = response.status;
    if (response.status === 401 && /^\/(games|platforms|users)(\/|$)/.test(path)) {
      window.dispatchEvent(new Event('gaming-abm:unauthorized'));
    } else if (response.status === 403 && /^\/(games|platforms|users)(\/|$)/.test(path)) {
      window.dispatchEvent(new Event('gaming-abm:authorization-changed'));
    }
    throw error;
  }

  return response.status === 204 ? null : response.json();
}
