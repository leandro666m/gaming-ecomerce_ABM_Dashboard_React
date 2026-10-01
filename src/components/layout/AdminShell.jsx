import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { navigationItems } from '../../config/navigation';
import { useGames } from '../../hooks/use-games';
import { usePlatforms } from '../../hooks/use-platforms';
import { useClients } from '../../hooks/use-clients';
import { useOrders } from '../../hooks/use-orders';
import { useUsers } from '../../hooks/use-users';
import DashboardPage from '../../pages/DashboardPage';
import GamesPage from '../../pages/GamesPage';
import OrdersPage from '../../pages/OrdersPage';
import UsersPage from '../../pages/UsersPage';
import PlatformsPage from '../../pages/PlatformsPage';
import ClientsPage from '../../pages/ClientsPage';
import { useAuth } from '../../auth/AuthContext';

export function AdminShell() {

  const navigate = useNavigate();
  const { isAdmin, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      window.alert('No se pudo cerrar la sesión. Intentá nuevamente.');
    }
  };

  const ordersData = useOrders();
  const { orders } = ordersData;

  const gamesData = useGames();
  const { games } = gamesData;

  const platformsData = usePlatforms();
  const { platforms } = platformsData;

  const clientsData = useClients();
  const { clients } = clientsData;

  const usersData = useUsers(isAdmin);
  const { users } = usersData;

  const location = useLocation();
  const section = location.pathname.split('/')[1] || 'dashboard';
  const visibleNavigation = navigationItems.filter(({ key }) => isAdmin || key !== 'users');
  const currentPage = visibleNavigation.find(({ key }) => key === section) || navigationItems[0];

  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPayment || 0), 0);

  // Alertas: tomamos la primera notificación activa entre los hooks y permitimos cerrarlas todas.
  const notices = [gamesData, platformsData, clientsData, ordersData, ...(isAdmin ? [usersData] : [])]
    .filter(({ notice }) => Boolean(notice));
  const notice = notices[0]?.notice || '';
  const dismissNotice = () => notices.forEach(({ setNotice }) => setNotice(''));

  return (
    <AdminLayout navigation={visibleNavigation} activeSection={section} onNavigate={(key) => navigate(`/${key}`)}
      title={currentPage.label} notice={notice} onDismiss={dismissNotice} userRole={isAdmin ? 'admin' : 'user'}
      onLogout={handleLogout}>

      {/* DASHBOARD */}
      <Routes>
        <Route path="dashboard" element={<DashboardPage games={games} clients={clients} orders={orders} revenue={revenue} />} />

        {/* PEDIDOS */}
        <Route path="orders" element={<OrdersPage orders={orders} />} />

        {/* CLIENTES */}
        <Route path="clients" element={<ClientsPage clients={clients} saveClient={clientsData.saveClient} />} />

        {/* JUEGOS */}
        <Route path="games" element={(
          <GamesPage games={games} platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar este juego?') && gamesData.removeGame(id)}
            saveGame={gamesData.saveGame} updateGame={gamesData.updateGame} />)}
        />

        {/* PLATAFORMAS */}
        <Route path="platforms" element={(
          <PlatformsPage platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar esta plataforma?') && platformsData.removePlatform(id)}
            savePlatform={platformsData.savePlatform} updatePlatform={platformsData.updatePlatform} />)}
        />

        {/* USUARIOS */}
        <Route path="users" element={isAdmin
          ? <UsersPage users={users} saveUser={usersData.saveUser} updateUser={usersData.updateUser} />
          : <Navigate to="/dashboard" replace />} />

        {/* Cualquiera otra ruta que no coincida con las anteriores redirige a /dashboard */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />

      </Routes>
    </AdminLayout>
  );
}
