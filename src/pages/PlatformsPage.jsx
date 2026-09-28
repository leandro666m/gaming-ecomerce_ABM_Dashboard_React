import { useCallback, useState } from 'react';
import { Pen, Tag, Trash2 } from 'lucide-react';
import { PlatformForm } from '../components/forms/PlatformForm';
import { Modal } from '../components/forms/ModalForms';
import { useAdminHeaderAction } from '../components/layout/AdminLayout';
import { SectionHeader, CardGrid, PlatformCard, IconButton } from '../components/ui/dashboard-primitives';


export default function PlatformsPage({ platforms, onDelete, savePlatform, updatePlatform }) {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPlatformId, setEditingPlatformId] = useState(null);
  const editingPlatform = platforms.find((platform) => platform.id === editingPlatformId);

  const openPlatformForm = useCallback(() => {
    setEditingPlatformId(null);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setEditingPlatformId(null);
    setIsFormOpen(false);
  }, []);
  
  useAdminHeaderAction(openPlatformForm, 'Nueva plataforma');
  
  const handleSubmit = async (values, { resetForm }) => {
    await (editingPlatform ? updatePlatform : savePlatform)(values);
    resetForm();
    closeForm();
  };
  
  const orderedPlatforms = [...(platforms ?? [])].sort(
    (firstPlatform, secondPlatform) => (firstPlatform.display_order ?? Number.MAX_SAFE_INTEGER)
      - (secondPlatform.display_order ?? Number.MAX_SAFE_INTEGER),
  );

  return <>
    <SectionHeader>
      <div>
        <h2>Plataformas</h2>
        <p>Catálogo de plataformas.</p>
      </div>
    </SectionHeader>

    <CardGrid>{orderedPlatforms.map((platform) =>

      <PlatformCard key={platform.id}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <IconButton onClick={() => onDelete(platform.id)} aria-label="Eliminar plataforma" > <Trash2 size={16}/> </IconButton>
            <IconButton onClick={() => { setEditingPlatformId(platform.id); setIsFormOpen(true); }} aria-label="Editar plataforma"> <Pen size={16} /> </IconButton>
          </div>
        
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {platform.iconUrl ? ( <img src={platform.iconUrl} alt="" width="54" height="54" /> ) : ( <Tag size={20} /> )}
            <strong>{platform.name}</strong>
          </div>
        
        <small>/{platform.slug}</small>
      </PlatformCard>)}

    </CardGrid>
    {isFormOpen && <Modal title={editingPlatform ? 'Editar plataforma' : 'Nueva plataforma'} onClose={closeForm}>
      <PlatformForm
        initialValues={editingPlatform}
        isEditing={!!editingPlatform}
        onSubmit={handleSubmit}
        onCancel={closeForm}
      />
    </Modal>}
  </>;
}
