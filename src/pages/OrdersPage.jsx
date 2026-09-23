import { SectionHeader, TableCard, Table, Badge, Empty } from '../components/ui/dashboard-primitives';

export default function OrdersPage({ orders }) {
  return <><SectionHeader><div><h2>Ventas</h2><p>Pedidos realizados desde las aplicaciones cliente.</p></div></SectionHeader><TableCard><Table><thead><tr><th>Pedido</th><th>Pago</th><th>Cliente</th><th>Total</th><th>Entrega</th></tr></thead><tbody>{orders.map((order) => <tr key={order.id}><td><strong>#{order.id}</strong></td><td><Badge>{order.paymentId || 'Pendiente'}</Badge></td><td>{order.shippingName || '—'}</td><td>${Number(order.totalPayment || 0).toFixed(2)}</td><td>{order.shippingCity || '—'}</td></tr>)}</tbody></Table>{!orders.length && <Empty>No hay ventas cargadas.</Empty>}</TableCard></>;
}
