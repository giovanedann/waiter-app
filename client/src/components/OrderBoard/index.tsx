import { useState } from 'react';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import * as S from './styles';
import OrderService from '../../services/OrderService';
import { toast } from 'react-toastify';

type OrderBoardProps = {
  icon: string;
  title: string;
  onCancelOrder: (orderId: string) => void
  orders: Order[];
}

export function OrderBoard({ icon, title, orders, onCancelOrder }: OrderBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 3000));
    await OrderService.cancelOrder(selectedOrder._id);

    toast.success(`Order from table ${selectedOrder.table} cancelled with success.`);

    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    setIsModalVisible(false);
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
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
      />

      {orders.length > 0 && (
        <S.Content>
          {orders.map((order) => (
            <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Table {order.table}</strong>
              <span>{order.products.length} items</span>
            </button>
          ))}
        </S.Content>
      )}
    </S.Container>
  );
}
