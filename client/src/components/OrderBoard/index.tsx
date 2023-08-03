import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import * as S from './styles';

type OrderBoardProps = {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <S.Container>
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseIconClick={handleCloseModal}
        onOverlayClick={handleCloseModal}
      />

      {orders.length > 0 && (
        <S.Content>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>{order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}
