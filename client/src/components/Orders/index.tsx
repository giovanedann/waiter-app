import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { OrderBoard } from '../OrderBoard';
import * as S from './styles';
import { Order } from '../../types/Order';
import OrderService from '../../services/OrderService';
import { toast } from 'react-toastify';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_API_URL, {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: Order) => {
      toast.info(`New order for table ${order.table} added`);

      setOrders((prevState) => prevState.concat(order));
    });

    return () => {
      socket.off('orders@new');
    };
  }, []);

  useEffect(() => {
    OrderService.getOrders().then((data) => {
      setOrders(data);
    });
  }, []);

  const waiting = orders.filter((order) => order.status === 'WAITING');
  const preparing = orders.filter((order) => order.status === 'IN_PRODUCTION');
  const delivered = orders.filter((order) => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter((order) => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderId ? { ...order, status } : order
    )));
  }

  return (
    <S.Container>
      <OrderBoard
        icon='🕝'
        title="Waiting"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <OrderBoard
        icon='👨🏻‍🍳'
        title="Preparing"
        orders={preparing}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <OrderBoard
        icon='✅'
        title="Delivered"
        orders={delivered}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </S.Container>
  );
}
