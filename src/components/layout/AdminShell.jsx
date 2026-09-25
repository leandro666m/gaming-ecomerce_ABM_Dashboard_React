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
  const [editingGameId, setEditingGameId] = useState(null);
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
  const editingGame = games.find((game) => game.id === editingGameId);

  const openGameForm = () => {
    setEditingGameId(null);
    setModal('game');
  };

  const closeModal = () => {
    setEditingGameId(null);
    setModal(null);
  };

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
          onClick: () => section === 'games'
            ? openGameForm()
            : setModal(section === 'platforms' ? 'platform' : 'client'),
          label: section === 'games' ? 'Nuevo juego' : section === 'platforms' ? 'Nueva plataforma' : 'Nuevo cliente',
        }
        : null}
    >
      <Routes>
        <Route path="dashboard" element={<DashboardPage games={games} clients={clients} orders={orders} revenue={revenue} />} />
        <Route path="games" element={<GamesPage games={games} platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar este juego?') && gamesData.removeGame(id)} onEdit={(id) => { setEditingGameId(id); setModal('game'); }} />} />
        <Route path="orders" element={<OrdersPage orders={orders} />} />
        <Route path="clients" element={<ClientsPage clients={clients} />} />
        <Route path="platforms" element={<PlatformsPage platforms={platforms} onDelete={(id) => window.confirm('¿Eliminar esta plataforma?') && platformsData.removePlatform(id)} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

      {modal === 'game' && 
        <Modal title={editingGame ? 'Editar juego' : 'Nuevo juego'} onClose={closeModal}>
          <GameForm
            key={editingGame?.id || 'new-game'}
            platforms={platforms}
            initialValues={editingGame ? {
              id: editingGame.id,
              title: editingGame.title || '',
              slug: editingGame.slug || '',
              price: editingGame.price ?? '',
              discount: editingGame.discount ?? 0,
              releaseDate: editingGame.releaseDate?.slice(0, 10) || '',
              summary: editingGame.summary || '',
              video: editingGame.video || '',
              cover: editingGame.cover || '',
              wallpaper: editingGame.wallpaper || '',
              screenshots: Array.isArray(editingGame.screenshots) ? editingGame.screenshots.join('\n') : editingGame.screenshots || '',
              platformId: editingGame.platformId ?? platforms[0]?.id ?? '',
            } : undefined}
            isEditing={Boolean(editingGame)}
            onSubmit={(values, formik) => submit(editingGame ? gamesData.updateGame : gamesData.saveGame, values, formik)}
            onCancel={closeModal}
          />
        </Modal>}
      {modal === 'client' && 
        <Modal title="Nuevo cliente" onClose={closeModal}>
          <ClientForm onSubmit={(values, formik) => submit(clientsData.saveClient, values, formik)} onCancel={closeModal} />
        </Modal>}
      {modal === 'platform' && 
        <Modal title="Nueva plataforma" onClose={closeModal}>
          <PlatformForm onSubmit={(values, formik) => submit(platformsData.savePlatform, values, formik)} onCancel={closeModal} />
        </Modal>}
    </AdminLayout>
  );
}
