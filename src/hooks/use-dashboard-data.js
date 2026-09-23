import { useEffect, useState } from 'react';
import { request } from '../API/client';
import { fallbackGames, fallbackPlatforms } from '../API/seed-data';

export function useDashboardData() {
  const [games, setGames] = useState(fallbackGames);
  const [platforms, setPlatforms] = useState(fallbackPlatforms);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    Promise.all([request('/games'), request('/platforms'), request('/users'), request('/orders')])
      .then(([loadedGames, loadedPlatforms, loadedUsers, loadedOrders]) => {
        setGames(loadedGames);
        setPlatforms(loadedPlatforms);
        setUsers(loadedUsers);
        setOrders(loadedOrders);
      })
      .catch(() => setNotice('API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.'));
  }, []);

  const saveGame = async (values) => {
    const payload = {
      ...values,
      price: Number(values.price),
      discount: Number(values.discount || 0),
      platformId: Number(values.platformId),
      screenshots: values.screenshots ? values.screenshots.split('\n').filter(Boolean) : [],
    };
    try {
      const created = await request(`/platforms/${payload.platformId}/games`, { method: 'POST', body: JSON.stringify(payload) });
      setGames((current) => [created, ...current]);
      setNotice('Juego creado correctamente.');
    } catch {
      setGames((current) => [{ ...payload, id: Date.now() }, ...current]);
      setNotice('Juego guardado localmente. No se pudo conectar al backend.');
    }
  };

  const saveUser = async (values) => {
    try {
      const created = await request('/users', { method: 'POST', body: JSON.stringify(values) });
      setUsers((current) => [created, ...current]);
      setNotice('Cliente creado correctamente.');
    } catch {
      setUsers((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Cliente guardado localmente. No se pudo conectar al backend.');
    }
  };

  const removeGame = async (id) => {
    try {
      await request(`/games/${id}`, { method: 'DELETE' });
    } catch {
      setNotice('Eliminado solo de la vista local.');
    }
    setGames((current) => current.filter((game) => game.id !== id));
  };

  const savePlatform = async (values) => {
    try {
      const created = await request('/platforms', { method: 'POST', body: JSON.stringify(values) });
      setPlatforms((current) => [created, ...current]);
      setNotice('Plataforma creada correctamente.');
    } catch {
      setPlatforms((current) => [{ ...values, id: Date.now() }, ...current]);
      setNotice('Plataforma guardada localmente. No se pudo conectar al backend.');
    }
  };

  const removePlatform = async (id) => {
    try {
      await request(`/platforms/${id}`, { method: 'DELETE' });
    } catch {
      setNotice('La plataforma tiene juegos asociados.');
    }
    setPlatforms((current) => current.filter((platform) => platform.id !== id));
  };

  return { games, platforms, users, orders, notice, setNotice, saveGame, saveUser, removeGame, savePlatform, removePlatform };
}
