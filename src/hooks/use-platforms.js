import { useEffect, useState } from 'react';
import { createPlatform, deletePlatform, fetchPlatforms, editPlatform } from '../API/platforms';
import { authorizationErrorMessage } from '../API/authorization';
import { fallbackPlatforms } from '../API/seed-data';

const API_FALLBACK_NOTICE = 'API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.';


export function usePlatforms() {
  const [platforms, setPlatforms] = useState(fallbackPlatforms);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchPlatforms()
      .then(setPlatforms)
      .catch(() => setNotice(API_FALLBACK_NOTICE));
  }, []);

  const savePlatform = async (values) => {
    try {
      const created = await createPlatform(values);
      setPlatforms((current) => [created, ...current]);
      setNotice('Plataforma creada correctamente.');
    } catch (error) {
      const authError = authorizationErrorMessage(error, 'crear plataformas');
      if (authError) {
        setNotice(authError);
        return;
      }
      setPlatforms((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Plataforma guardada localmente. No se pudo conectar al backend.');
    }
  };

  const updatePlatform = async (values) => {
    try {
      const updated = await editPlatform(values);
      setPlatforms((current) => current.map((platform) =>
        platform.id === values.id ? { ...platform, ...updated } : platform
      ));
      setNotice('Plataforma actualizada correctamente.');
    } catch (error) {
      const authError = authorizationErrorMessage(error, 'editar plataformas');
      if (authError) {
        setNotice(authError);
        return;
      }
      setPlatforms((current) => current.map((platform) =>
        platform.id === values.id ? { ...values, id: platform.id } : platform
      ));
      setNotice('Plataforma actualizada localmente. No se pudo conectar al backend.');
    }
  };

  const removePlatform = async (id) => {
    try {
      await deletePlatform(id);
      setPlatforms((current) => current.filter((platform) => platform.id !== id));
    } catch (error) {
      const authError = authorizationErrorMessage(error, 'eliminar plataformas');
      if (authError) {
        setNotice(authError);
        return;
      }
      setNotice('La plataforma tiene juegos asociados.');
    }
  };

  return { platforms, notice, setNotice, savePlatform, removePlatform, updatePlatform };
}
