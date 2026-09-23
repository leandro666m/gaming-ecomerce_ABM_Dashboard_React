import { Tag, Trash2 } from 'lucide-react';
import { SectionHeader, CardGrid, PlatformCard, IconButton } from '../components/ui/dashboard-primitives';

export default function PlatformsPage({ platforms }) {

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
          <IconButton onClick={() => onDelete(platform.id)} aria-label="Eliminar plataforma" style={{ display: 'flex', flexDirection: 'row-reverse' }}> <Trash2 size={16}/> </IconButton>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          {platform.iconUrl ? ( <img src={platform.iconUrl} alt="" width="54" height="54" /> ) : ( <Tag size={20} /> )}
          <strong>{platform.name}</strong>
        </div>
        <small>/{platform.slug}</small>
      </PlatformCard>)}

    </CardGrid></>;
}
