import { useEffect, useState } from 'react';
import { fetchOrders } from '../API/orders';

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(() => setNotice('No se pudieron cargar las ventas desde el backend.'));
  }, []);

  return { orders, notice, setNotice };
}
