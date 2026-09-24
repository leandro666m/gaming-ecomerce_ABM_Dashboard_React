const API_URL = import.meta.env.VITE_API_URL || '';

export const apiUrl = API_URL;

export async function request(path, options) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options?.headers || {}) },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API ${response.status}: ${response.statusText}`);
  }

  return response.status === 204 ? null : response.json();
}
