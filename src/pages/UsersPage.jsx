import { useCallback, useState, useMemo } from 'react';
import { Pen, Search } from 'lucide-react';
import { UserForm } from '../components/forms/UserForm';
import { Modal } from '../components/forms/ModalForms';
import { useAdminHeaderAction } from '../components/layout/AdminLayout';
import { SectionHeader, SearchBox, TableCard, Table, Empty, IconButton } from '../components/ui/dashboard-primitives';



export default function UsersPage({ users, saveUser, updateUser  }) {
  const [query, setQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const editingUser = users.find((user) => user.id === editingUserId);

  const openUserForm = useCallback(() => {
    setEditingUserId(null);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingUserId(null);
    setIsFormOpen(false);
  }, []);

  
  useAdminHeaderAction(openUserForm, 'Nuevo usuario');
  
  const handleSubmit = async (values, { resetForm }) => {
    await (editingUser ? updateUser : saveUser)(values);
    resetForm();
    closeForm();
  };
  
  const filtered = useMemo(() =>
    users.filter((user) => 
      `${user.firstName} ${user.lastName} ${user.email}`.toLowerCase().includes(query.toLowerCase()))
  , [users, query]);


  return <>
    <SectionHeader>
      <div>
        <h2>Usuarios</h2>
        <p>Administrá las cuentas de usuario en la tienda.</p>
      </div>
      
      <SearchBox>
        <Search size={17} />
        <input placeholder="Buscar usuario..." value={query} onChange={(event) => setQuery(event.target.value)} />  
      </SearchBox>
    </SectionHeader>

    <TableCard>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Creado</th>
            <th>Editado</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((user) => (
            <tr key={user.id}>
              <td>
                <IconButton onClick={() => { setEditingUserId(user.id); setIsFormOpen(true); }} aria-label="Editar usuario"> <Pen size={16} /> </IconButton>
                <strong>{user.firstName} {user.lastName}</strong>
              </td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.active ? 'Activo' : 'Inactivo'}</td>
              <td>{user.createdAt}</td>
              <td>{user.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {!filtered.length && <Empty>No hay usuarios cargados o no coinciden con la búsqueda.</Empty>}

    </TableCard>

    {isFormOpen && (
      <Modal title={editingUser ? "Editar usuario" : "Nuevo usuario"} onClose={closeForm}>
        <UserForm
          initialValues={editingUser}
          isEditing={!!editingUser}
          onSubmit={handleSubmit} 
          onCancel={closeForm} 
        />
      </Modal>
    )}
  </>;
}

