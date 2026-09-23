import { useState } from 'react';
import { Search } from 'lucide-react';
import { SectionHeader, SearchBox, TableCard, Table, Empty } from '../components/ui/dashboard-primitives';

export default function UsersPage({ users }) {
  const [query, setQuery] = useState('');
  const filtered = users.filter((user) => `${user.firstName} ${user.lastName} ${user.username} ${user.email}`.toLowerCase().includes(query.toLowerCase()));
  return <><SectionHeader><div><h2>Clientes y usuarios</h2><p>Administrá las cuentas que compran en la tienda.</p></div><SearchBox><Search size={17} /><input placeholder="Buscar cliente..." value={query} onChange={(event) => setQuery(event.target.value)} /></SearchBox></SectionHeader><TableCard><Table><thead><tr><th>Nombre</th><th>Usuario</th><th>Email</th><th>ID</th></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td><strong>{user.firstName} {user.lastName}</strong></td><td>{user.username}</td><td>{user.email}</td><td>#{user.id}</td></tr>)}</tbody></Table>{!filtered.length && <Empty>No hay clientes cargados o no coinciden con la búsqueda.</Empty>}</TableCard></>;
}
