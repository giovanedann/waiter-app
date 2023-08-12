import { useEffect, useState } from 'react';
import { OrderBoard } from '../OrderBoard';
import * as S from './styles';
import { Order } from '../../types/Order';
import OrderService from '../../services/OrderService';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

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

  return (
    <S.Container>
      <OrderBoard
        icon='🕝'
        title="Waiting"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
      />

      <OrderBoard
        icon='👨🏻‍🍳'
        title="Preparing"
        orders={preparing}
        onCancelOrder={handleCancelOrder}
      />

      <OrderBoard
        icon='✅'
        title="Delivered"
        orders={delivered}
        onCancelOrder={handleCancelOrder}
      />
    </S.Container>
  );
}
