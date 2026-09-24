import { useEffect, useState } from 'react';
import { createPlatform, deletePlatform, fetchPlatforms } from '../API/platforms';
import { fallbackPlatforms } from '../API/seed-data';

export function usePlatforms() {
  const [platforms, setPlatforms] = useState(fallbackPlatforms);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchPlatforms()
      .then(setPlatforms)
      .catch(() => setNotice('API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.'));
  }, []);

  const savePlatform = async (values) => {
    try {
      const created = await createPlatform(values);
      setPlatforms((current) => [created, ...current]);
      setNotice('Plataforma creada correctamente.');
    } catch {
      setPlatforms((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Plataforma guardada localmente. No se pudo conectar al backend.');
    }
  };

  const removePlatform = async (id) => {
    try {
      await deletePlatform(id);
    } catch {
      setNotice('La plataforma tiene juegos asociados.');
    }
    setPlatforms((current) => current.filter((platform) => platform.id !== id));
  };

  return { platforms, notice, setNotice, savePlatform, removePlatform };
}
