import { useEffect, useState } from 'react';
import { createGame, deleteGame, fetchGames, normalizeGamePayload } from '../API/games';
import { fallbackGames } from '../API/seed-data';

const API_FALLBACK_NOTICE = 'API no disponible: se muestran datos de ejemplo. Configurá VITE_API_URL para conectar el backend.';

export function useGames() {
  const [games, setGames] = useState(fallbackGames);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchGames()
      .then(setGames)
      .catch(() => setNotice(API_FALLBACK_NOTICE));
  }, []);

  const saveGame = async (values) => {
    try {
      const created = await createGame(values);
      setGames((current) => [created, ...current]);
      setNotice('Juego creado correctamente.');
    } catch {
      const localGame = { ...normalizeGamePayload(values), id: Date.now() };
      setGames((current) => [localGame, ...current]);
      setNotice('Juego guardado localmente. No se pudo conectar al backend.');
    }
  };

  const removeGame = async (id) => {
    try {
      await deleteGame(id);
    } catch {
      setNotice('Eliminado solo de la vista local.');
    }
    setGames((current) => current.filter((game) => game.id !== id));
  };

  return { games, notice, setNotice, saveGame, removeGame };
}
