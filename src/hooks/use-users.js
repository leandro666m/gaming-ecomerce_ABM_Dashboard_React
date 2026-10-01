import { useEffect, useState } from 'react';
import { createUser, fetchUsers, updateUser as updateUserRequest } from '../API/users';
import { authorizationErrorMessage } from '../API/authorization';

export function useUsers(enabled = true) {
  const [users, setUsers] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    if (!enabled) return undefined;
    fetchUsers()
      .then(setUsers)
      .catch(() => setNotice('Conexión no disponible.'));
  }, [enabled]);

  const saveUser = async (values) => {
    try {
      const created = await createUser(values);
      setUsers((current) => [created, ...current]);
      setNotice('Usuario creado correctamente.');
    } catch (error) {
      const authError = authorizationErrorMessage(error, 'crear usuarios');
      if (authError) {
        setNotice(authError);
        return;
      }
      setUsers((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Usuario guardado localmente. No se pudo conectar al backend.');
    }
  };

  const updateUser = async (values) => {
    try {
      const updated = await updateUserRequest(values);
      setUsers((current) => current.map((user) => user.id === updated.id ? updated : user));
      setNotice('Usuario actualizado correctamente.');
    } catch (error) {
      const authError = authorizationErrorMessage(error, 'editar usuarios');
      if (authError) {
        setNotice(authError);
        return;
      }
      setUsers((current) => current.map((user) => user.id === values.id ? { ...user, ...values } : user));
      setNotice('Usuario actualizado localmente. No se pudo conectar al backend.');
    }
  };

  return { users, notice, setNotice, saveUser, updateUser };
}
