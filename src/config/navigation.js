import { LayoutDashboard, Package, ShoppingCart, Tag, Users } from 'lucide-react';

export const navigationItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'games', label: 'Catálogo', icon: Package },
  { key: 'orders', label: 'Ventas', icon: ShoppingCart },
  { key: 'users', label: 'Clientes', icon: Users },
  { key: 'platforms', label: 'Plataformas', icon: Tag },
];
