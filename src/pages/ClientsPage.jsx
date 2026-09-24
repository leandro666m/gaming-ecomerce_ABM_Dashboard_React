import { useState } from 'react';
import { Search } from 'lucide-react';
import { SectionHeader, SearchBox, TableCard, Table, Empty } from '../components/ui/dashboard-primitives';

export default function ClientsPage({ clients }) {
  const [query, setQuery] = useState('');
  const filtered = clients.filter((client) => `${client.firstName} ${client.lastName} ${client.username} ${client.email}`.toLowerCase().includes(query.toLowerCase()));
  return <><SectionHeader><div><h2>Clientes</h2><p>Administrá las cuentas que compran en la tienda.</p></div><SearchBox><Search size={17} /><input placeholder="Buscar cliente..." value={query} onChange={(event) => setQuery(event.target.value)} /></SearchBox></SectionHeader><TableCard><Table><thead><tr><th>Nombre</th><th>Usuario</th><th>Email</th><th>ID</th></tr></thead><tbody>{filtered.map((client) => <tr key={client.id}><td><strong>{client.firstName} {client.lastName}</strong></td><td>{client.username}</td><td>{client.email}</td><td>#{client.id}</td></tr>)}</tbody></Table>{!filtered.length && <Empty>No hay clientes cargados o no coinciden con la búsqueda.</Empty>}</TableCard></>;
}
