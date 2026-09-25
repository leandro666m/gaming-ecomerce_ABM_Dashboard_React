import { useCallback, useState } from 'react';
import { Tag, Trash2 } from 'lucide-react';
import { PlatformForm } from '../components/forms/PlatformForm';
import { Modal } from '../components/forms/ModalForms';
import { useAdminHeaderAction } from '../components/layout/AdminLayout';
import { SectionHeader, CardGrid, PlatformCard, IconButton } from '../components/ui/dashboard-primitives';

export default function PlatformsPage({ platforms, onDelete, savePlatform }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openPlatformForm = useCallback(() => setIsFormOpen(true), []);
  const closeForm = useCallback(() => setIsFormOpen(false), []);

  const orderedPlatforms = [...(platforms ?? [])].sort(
    (firstPlatform, secondPlatform) => (firstPlatform.display_order ?? Number.MAX_SAFE_INTEGER)
      - (secondPlatform.display_order ?? Number.MAX_SAFE_INTEGER),
  );

  useAdminHeaderAction(openPlatformForm, 'Nueva plataforma');

  const handleSubmit = async (values, { resetForm }) => {
    await savePlatform(values);
    resetForm();
    closeForm();
  };

  return <>
    <SectionHeader>
      <div>
        <h2>Plataformas</h2>
        <p>Catálogo de plataformas.</p>
      </div>
    </SectionHeader>

    <CardGrid>{orderedPlatforms.map((platform) =>

      <PlatformCard key={platform.id}>
          <IconButton onClick={() => onDelete(platform.id)} aria-label="Eliminar plataforma" style={{ display: 'flex', flexDirection: 'row-reverse' }}> <Trash2 size={16}/> </IconButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {platform.iconUrl ? ( <img src={platform.iconUrl} alt="" width="54" height="54" /> ) : ( <Tag size={20} /> )}
          <strong>{platform.name}</strong>
        </div>
        <small>/{platform.slug}</small>
      </PlatformCard>)}

    </CardGrid>
    {isFormOpen && <Modal title="Nueva plataforma" onClose={closeForm}>
      <PlatformForm onSubmit={handleSubmit} onCancel={closeForm} />
    </Modal>}
  </>;
}
