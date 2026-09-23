import { Tag } from 'lucide-react';
import { SectionHeader, CardGrid, PlatformCard } from '../components/ui/dashboard-primitives';

export default function PlatformsPage({ platforms }) {
  return <><SectionHeader><div><h2>Plataformas</h2><p>Catálogo de consolas y plataformas soportadas.</p></div></SectionHeader><CardGrid>{platforms.map((platform) => <PlatformCard key={platform.id}><Tag size={20} /><strong>{platform.name}</strong><small>/{platform.slug}</small></PlatformCard>)}</CardGrid></>;
}
