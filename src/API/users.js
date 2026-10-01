import { request } from './request';

export function fetchUsers() {
  return request('/users');
}

export function createUser(values) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}

export function updateUser(values) {
  const { id } = values;
  const user = {
    email: values.email,
    password: values.password,
    firstName: values.firstName,
    lastName: values.lastName,
    role: values.role,
    active: values.active,
  };

  return request(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
  });
}
