import { useMemo, useState } from 'react';
import { Image, Search, Trash2 } from 'lucide-react';
import { SectionHeader, SearchBox, TableCard, Table, GameCell, CoverPlaceholder, Badge, IconButton, Empty } from '../components/ui/dashboard-primitives';

export default function GamesPage({ games, platforms, onDelete }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => games.filter((game) => `${game.title} ${game.slug} ${platforms.find((platform) => platform.id === game.platformId)?.name || ''}`.toLowerCase().includes(query.toLowerCase())), [games, platforms, query]);
  
  
  return <>
    <SectionHeader>
      <div>
        <h2>Catálogo de juegos</h2>
        <p>ABM de títulos, precios, medios y plataforma.</p>
        </div>
          <SearchBox>
            <Search size={17} />
              <input placeholder="Buscar juego..." value={query} onChange={(event) => setQuery(event.target.value)} />
            </SearchBox>
    </SectionHeader>
    
    <TableCard>
      <Table>
        <thead>
          <tr>
            <th>Juego</th>
            <th>Plataforma</th>
            <th>Precio</th>
            <th>Descuento</th>
            <th>Lanzamiento</th>
            <th />
          </tr>
        </thead>
        <tbody>{filtered.map((game) =>
           <tr key={game.id}>
            <td>
              <GameCell>{game.cover ? 
                <img src={game.cover} alt="" /> : <CoverPlaceholder> <Image size={18} /> </CoverPlaceholder>}
                <strong>{game.title}</strong>
              </GameCell>
            </td>
            <td><Badge>{platforms.find((platform) => platform.id === game.platformId)?.name || '—'}</Badge> </td>
            <td>${Number(game.price).toFixed(2)}</td>
            <td>{game.discount || 0}%</td>
            <td>{game.releaseDate || '—'}</td>
            <td><IconButton onClick={() => onDelete(game.id)} aria-label="Eliminar juego"><Trash2 size={16} /></IconButton></td>
          </tr>)}
        </tbody></Table>{!filtered.length && <Empty>No se encontraron juegos.</Empty>}
        </TableCard></>;
}
