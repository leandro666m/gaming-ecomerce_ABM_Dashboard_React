import { useEffect, useState } from 'react';
import { createUser, fetchUsers } from '../API/users';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(() => setNotice('API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.'));
  }, []);

  const saveUser = async (values) => {
    try {
      const created = await createUser(values);
      setUsers((current) => [created, ...current]);
      setNotice('Cliente creado correctamente.');
    } catch {
      setUsers((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Cliente guardado localmente. No se pudo conectar al backend.');
    }
  };

  return { users, notice, setNotice, saveUser };
}
