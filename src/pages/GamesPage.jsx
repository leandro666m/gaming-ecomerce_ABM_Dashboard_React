import { useCallback, useMemo, useState } from 'react';
import { Image, Pen, Search, Trash2 } from 'lucide-react';
import { GameForm } from '../components/forms/GameForm';
import { Modal } from '../components/forms/ModalForms';
import { useAdminHeaderAction } from '../components/layout/AdminLayout';
import { SectionHeader, SearchBox, TableCard, Table, GameCell, CoverPlaceholder, Badge, IconButton, Empty } from '../components/ui/dashboard-primitives';


export default function GamesPage({ games, platforms, onDelete, saveGame, updateGame }) {

  const [query, setQuery] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGameId, setEditingGameId] = useState(null);
  const filtered = useMemo(
    () => games.filter((game) => 
      `${game.title} ${game.slug} ${platforms.find( (platform) => platform.id === game.platformId)?.name || ''}`.toLowerCase().includes(query.toLowerCase()) )
    , [games, platforms, query]);
  const editingGame = games.find((game) => game.id === editingGameId);
  const openNewGameForm = useCallback(() => {
    setEditingGameId(null);
    setIsFormOpen(true);
  }, []);
  const closeForm = useCallback(() => {
    setEditingGameId(null);
    setIsFormOpen(false);
  }, []);

  useAdminHeaderAction(openNewGameForm, 'Nuevo juego');

  const handleSubmit = async (values, { resetForm }) => {
    await (editingGame ? updateGame : saveGame)(values);
    resetForm();
    closeForm();
  };

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
              <GameCell>{game.cover ? <img style={{maxWidth:'130px'}} src={game.cover} alt="" /> : <CoverPlaceholder> <Image size={18} /> </CoverPlaceholder>}
                <strong>{game.title}</strong>
              </GameCell>
            </td>
            <td><Badge>{platforms.find((platform) => platform.id === game.platformId)?.name || '—'}</Badge> </td>
            <td>${Number(game.price).toFixed(2)}</td>
            <td>{game.discount || 0}%</td>
            <td>{game.releaseDate || '—'}</td>
            <td>
              <IconButton onClick={() => onDelete(game.id)} aria-label="Eliminar juego"> <Trash2 size={16} /> </IconButton>
              <IconButton onClick={() => { setEditingGameId(game.id); setIsFormOpen(true); }} aria-label="Editar juego"> <Pen size={16} /> </IconButton>
            </td>
          </tr>)}

        </tbody>
      </Table>
      
        {!filtered.length && <Empty>No se encontraron juegos.</Empty>}
      
    </TableCard>
    {isFormOpen && <Modal title={editingGame ? 'Editar juego' : 'Nuevo juego'} onClose={closeForm}>
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
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />
    </Modal>}
  </>
}
