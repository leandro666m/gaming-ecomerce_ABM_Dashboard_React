import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AdminLayout } from './components/layout/AdminLayout';
import { Modal } from './components/forms/ModalForms';
import { GameForm } from './components/forms/GameForm';
import { UserForm } from './components/forms/UserForm';
import { PlatformForm } from './components/forms/PlatformForm';
import { navigationItems } from './config/navigation';
import { useDashboardData } from './hooks/use-dashboard-data';
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import OrdersPage from './pages/OrdersPage';
import PlatformsPage from './pages/PlatformsPage';
import UsersPage from './pages/UsersPage';

function App() {

  return <BrowserRouter>
    <Routes>
      <Route path="/*" element={<AdminShell />} />
    </Routes>
    </BrowserRouter>;
}

function AdminShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null);
  const { games, platforms, users, orders, notice, setNotice, saveGame, saveUser, removeGame, savePlatform, removePlatform } = useDashboardData();
  const section = location.pathname.split('/')[1] || 'dashboard';
  const currentPage = navigationItems.find(({ key }) => key === section) || navigationItems[0];
  const revenue = orders.reduce((sum, order) => sum + Number(order.totalPayment || 0), 0);

  const submitGame = async (values, { resetForm }) => {
    await saveGame(values);
    resetForm();
    setModal(null);
  };

  const submitUser = async (values, { resetForm }) => {
    await saveUser(values);
    resetForm();
    setModal(null);
  };

  const handleRemoveGame = (id) => {
    if (window.confirm('¿Eliminar este juego?')) removeGame(id);
  };

  const submitPlatform = async (values, { resetForm }) => {
    await savePlatform(values);
    resetForm();
    setModal(null);
  }

  const handleRemovePlatform = (id) => {
    if (window.confirm('¿Eliminar esta plataforma?')) removePlatform(id);
  };

  return <>
    <AdminLayout
      navigation={navigationItems}
      activeSection={section}
      onNavigate={(key) => navigate(`/${key}`)}
      title={currentPage.label}
      notice={notice}
      onDismiss={() => setNotice('')}
      action={(section === 'games' || section === 'users' || section === 'platforms') ? 
        { 
          onClick: () => setModal(section === 'games' ? 'game' : section === 'platforms' ? 'platform' : 'user'),
          label: `${section === 'games' ? 'Nuevo juego' : section === 'platforms' ? 'Nueva plataforma' : 'Nuevo cliente'}` 
        } : null}
        >
      <Routes>
        <Route path="dashboard" element={<DashboardPage games={games} users={users} orders={orders} revenue={revenue} />} />
        <Route path="games" element={<GamesPage games={games} platforms={platforms} onDelete={handleRemoveGame} />} />
        <Route path="orders" element={<OrdersPage orders={orders} />} />
        <Route path="users" element={<UsersPage users={users} />} />
        <Route path="platforms" element={<PlatformsPage platforms={platforms} onDelete={handleRemovePlatform} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      
      {modal === 'game' && 
        <Modal title="Nuevo juego" onClose={() => setModal(null)}>
          <GameForm platforms={platforms} onSubmit={submitGame} onCancel={() => setModal(null)} />
        </Modal>}
      {modal === 'user' && 
        <Modal title="Nuevo cliente" onClose={() => setModal(null)}>
          <UserForm onSubmit={submitUser} onCancel={() => setModal(null)} />
        </Modal>}
      {modal === 'platform' && 
        <Modal title="Nueva plataforma" onClose={() => setModal(null)}>
          <PlatformForm onSubmit={submitPlatform} onCancel={() => setModal(null)} />
        </Modal>}

    </AdminLayout>;
  </>
}

export default App;
