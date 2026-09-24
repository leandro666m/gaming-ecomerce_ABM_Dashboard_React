import { useEffect, useState } from 'react';
import { createClient, fetchClients } from '../API/clients';

export function useClients() {
  const [clients, setClients] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch(() => setNotice('API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.'));
  }, []);

  const saveClient = async (values) => {
    try {
      const created = await createClient(values);
      setClients((current) => [created, ...current]);
      setNotice('Cliente creado correctamente.');
    } catch {
      setClients((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Cliente guardado localmente. No se pudo conectar al backend.');
    }
  };

  return { clients, notice, setNotice, saveClient };
}
