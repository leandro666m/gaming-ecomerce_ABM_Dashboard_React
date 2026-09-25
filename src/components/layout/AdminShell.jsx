import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { navigationItems } from '../../config/navigation';
import { useGames } from '../../hooks/use-games';
import { usePlatforms } from '../../hooks/use-platforms';
import { useClients } from '../../hooks/use-clients';
import { useOrders } from '../../hooks/use-orders';
import DashboardPage from '../../pages/DashboardPage';
import GamesPage from '../../pages/GamesPage';
import OrdersPage from '../../pages/OrdersPage';
import PlatformsPage from '../../pages/PlatformsPage';
import ClientsPage from '../../pages/ClientsPage';

export function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const gamesData = useGames();
  const platformsData = usePlatforms();
  const clientsData = useClients();
  const ordersData = useOrders();
  const { orders } = ordersData;
  const { games } = gamesData;
  const { platforms } = platformsData;
  const { clients } = clientsData;
  const section = location.pathname.split('/')[1] || 'dashboard';
  const currentPage = navigationItems.find(({ key }) => key === section) || navigationItems[0];
  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPayment || 0), 0);
  const notices = [gamesData, platformsData, clientsData, ordersData];
  const notice = notices.find(({ notice: currentNotice }) => currentNotice)?.notice || '';

  const dismissNotice = () => notices.forEach(({ setNotice }) => setNotice(''));

  return (
    <AdminLayout
      navigation={navigationItems}
      activeSection={section}
      onNavigate={(key) => navigate(`/${key}`)}
      title={currentPage.label}
      notice={notice}
      onDismiss={dismissNotice}
    >

      {/* DASHBOARD */}
      <Routes>
        <Route 
          path="dashboard" 
          element={
            <DashboardPage games={games} clients={clients} orders={orders} revenue={revenue} />
            } 
        />

        {/* JUEGOS */}
        <Route
          path="games"
          element={(
            <GamesPage
              games={games}
              platforms={platforms}
              onDelete={(id) => window.confirm('¿Eliminar este juego?') && gamesData.removeGame(id)}
              saveGame={gamesData.saveGame}
              updateGame={gamesData.updateGame}
            />
          )}
        />

        {/* PEDIDOS */}
        <Route 
          path="orders"
          element={
            <OrdersPage orders={orders} />
          }
        />

        {/* CLIENTES */}
        <Route 
          path="clients"
          element={
            <ClientsPage clients={clients} saveClient={clientsData.saveClient} />
          }
        />

        {/* PLATAFORMAS */}
        <Route
          path="platforms"
          element={(
            <PlatformsPage
              platforms={platforms}
              onDelete={(id) => window.confirm('¿Eliminar esta plataforma?') && platformsData.removePlatform(id)}
              savePlatform={platformsData.savePlatform}
            />
          )}
        />

        {/* Cualquiera otra ruta que no coincida con las anteriores redirige a /dashboard */}
        <Route 
          path="*"
          element={
            <Navigate to="/dashboard" replace />
          }
        />

      </Routes>
    </AdminLayout>
  );
}
