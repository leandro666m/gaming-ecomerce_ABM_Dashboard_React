import { useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from './AdminLayout';
import { Modal } from '../forms/ModalForms';
import { GameForm } from '../forms/GameForm';
import { ClientForm } from '../forms/ClientForm';
import { PlatformForm } from '../forms/PlatformForm';
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
  const [modal, setModal] = useState(null);
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

  const submit = async (save, values, { resetForm }) => {
    await save(values);
    resetForm();
    setModal(null);
  };

  const dismissNotice = () => notices.forEach(({ setNotice }) => setNotice(''));

  return (
    <AdminLayout
      navigation={navigationItems}
      activeSection={section}
      onNavigate={(key) => navigate(`/${key}`)}
      title={currentPage.label}
      notice={notice}
      onDismiss={dismissNotice}
      action={['games', 'clients', 'platforms'].includes(section)
        ? {
          onClick: () => setModal(section === 'games' ? 'game' : section === 'platforms' ? 'platform' : 'client'),
          label: section === 'games' ? 'Nuevo juego' : section === 'platforms' ? 'Nueva plataforma' : 'Nuevo cliente',
        }
        : null}
    >
      <Routes>
        <Route path="dashboard" element={<DashboardPage games={games} clients={clients} orders={orders} revenue={revenue} />} />
        <Route path="games" element={<GamesPage games={games} platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar este juego?') && gamesData.removeGame(id)} />} />
        <Route path="orders" element={<OrdersPage orders={orders} />} />
        <Route path="clients" element={<ClientsPage clients={clients} />} />
        <Route path="platforms" element={<PlatformsPage platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar esta plataforma?') && platformsData.removePlatform(id)} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {modal === 'game' && 
        <Modal title="Nuevo juego" onClose={() => setModal(null)}>
          <GameForm platforms={platforms} onSubmit={(values, formik) => submit(gamesData.saveGame, values, formik)} onCancel={() => setModal(null)} />
        </Modal>}
      {modal === 'client' && 
        <Modal title="Nuevo cliente" onClose={() => setModal(null)}>
          <ClientForm onSubmit={(values, formik) => submit(clientsData.saveClient, values, formik)} onCancel={() => setModal(null)} />
        </Modal>}
      {modal === 'platform' && 
        <Modal title="Nueva plataforma" onClose={() => setModal(null)}>
          <PlatformForm onSubmit={(values, formik) => submit(platformsData.savePlatform, values, formik)} onCancel={() => setModal(null)} />
        </Modal>}
    </AdminLayout>
  );
}
