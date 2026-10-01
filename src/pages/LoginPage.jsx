import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../auth/AuthContext';

export default function LoginPage() {
  const { user, login, isLoading, error: sessionError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return null;
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.status === 401
        ? 'Email o contraseña incorrectos, o cuenta inactiva.'
        : 'No se pudo iniciar sesión. Verificá la conexión con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Page>
      <LoginCard>
        <Brand>GAMING<span>ABM</span></Brand>
        <h1>Iniciar sesión</h1>
        <p>Ingresá con tu cuenta para administrar el panel.</p>
        {(error || sessionError) && <Error role="alert">{error || sessionError}</Error>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Ingresando…' : 'Ingresar'}
          </SubmitButton>
        </form>
      </LoginCard>
    </Page>
  );
}

const Page = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background: ${({ theme }) => theme.colors.background};
`;
const LoginCard = styled.section`
  width: min(100%, 420px);
  padding: 36px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: 0 18px 55px rgba(0, 0, 0, .08);

  h1 { margin: 28px 0 8px; color: ${({ theme }) => theme.colors.text}; }
  p { margin: 0 0 24px; color: ${({ theme }) => theme.colors.muted}; }
  form { display: grid; gap: 10px; }
  label { margin-top: 8px; font-size: 14px; font-weight: 600; }
  input {
    width: 100%;
    padding: 12px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surface};
  }
`;
const Brand = styled.div`
  font-weight: 800;
  letter-spacing: .08em;
  color: ${({ theme }) => theme.colors.text};
  span { color: ${({ theme }) => theme.colors.secondary}; }
`;
const Error = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border-radius: 8px;
  color: #a52828;
  background: #fff0f0;
`;
const SubmitButton = styled.button`
  margin-top: 12px;
  padding: 12px;
  border: 0;
  border-radius: 8px;
  color: #fff;
  background: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  cursor: pointer;
  &:disabled { opacity: .65; cursor: wait; }
`;
