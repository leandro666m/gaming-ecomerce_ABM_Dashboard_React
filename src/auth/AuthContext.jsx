import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { fetchCsrfToken, fetchCurrentUser, login as loginRequest, logout as logoutRequest } from '../API/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleUnauthorized = () => {
      setUser(null);
      setError('La sesión expiró. Iniciá sesión nuevamente.');
    };
    const refreshAuthorization = () => {
      fetchCurrentUser()
        .then(setUser)
        .catch((requestError) => {
          if (requestError.status === 401) handleUnauthorized();
          else setError('No se pudieron actualizar los permisos de la sesión.');
        });
    };
    window.addEventListener('gaming-abm:unauthorized', handleUnauthorized);
    window.addEventListener('gaming-abm:authorization-changed', refreshAuthorization);

    const restoreSession = async () => {
      try {
        await fetchCsrfToken();
        setUser(await fetchCurrentUser());
      } catch (requestError) {
        if (requestError.status !== 401) {
          setError('No se pudo validar la sesión. Verificá la conexión con el servidor.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
    return () => {
      window.removeEventListener('gaming-abm:unauthorized', handleUnauthorized);
      window.removeEventListener('gaming-abm:authorization-changed', refreshAuthorization);
    };
  }, []);

  const login = async (credentials) => {
    setError('');
    const authenticatedUser = await loginRequest(credentials);
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = async () => {
    await logoutRequest();
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    isAdmin: user?.role === 'admin',
    isLoading,
    error,
    setError,
    login,
    logout,
  }), [user, isLoading, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider.');
  }
  return context;
}
