import { BarChart3, Image, Package, ShoppingCart, UserRound, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Stats, StatCard, StatIcon, StatLabel, StatValue, SectionHeader, TableCard, SummaryGrid, Summary } from '../components/ui/dashboard-primitives';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage({ games, users, orders, revenue }) {
  const navigate = useNavigate();
  return <><Stats>
    <StatCard as={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><StatIcon color="purple"><Package size={20} /></StatIcon><div><StatLabel>Juegos publicados</StatLabel><StatValue>{games.length}</StatValue></div></StatCard>
    <StatCard as={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08 }}><StatIcon color="cyan"><ShoppingCart size={20} /></StatIcon><div><StatLabel>Ventas registradas</StatLabel><StatValue>{orders.length}</StatValue></div></StatCard>
    <StatCard as={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 }}><StatIcon color="green"><Users size={20} /></StatIcon><div><StatLabel>Clientes</StatLabel><StatValue>{users.length}</StatValue></div></StatCard>
  </Stats><SectionHeader><div><h2>Resumen comercial</h2><p>Estado actual de la operación del ecommerce.</p></div></SectionHeader>
    <TableCard><SummaryGrid><Summary><BarChart3 size={20} /><span>Facturación acumulada</span><strong>${revenue.toFixed(2)}</strong></Summary><Summary onClick={() => navigate('/games')}><Image size={20} /><span>Catálogo listo para publicar</span><strong>{games.filter((game) => game.cover).length} con portada</strong></Summary><Summary onClick={() => navigate('/users')}><UserRound size={20} /><span>Gestión de clientes</span><strong>Administrar usuarios →</strong></Summary></SummaryGrid></TableCard>
  </>;
}
