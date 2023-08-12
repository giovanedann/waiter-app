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
  onOrderStatusChange: (orderId: string, status: Order['status']) => void
  orders: Order[];
}

export function OrderBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrderBoardProps) {
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

    await OrderService.cancelOrder(selectedOrder._id);

    toast.success(`Order from table ${selectedOrder.table} cancelled with success.`);

    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;

    setIsLoading(true);

    const status = selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';
    await OrderService.changeOrderStatus(selectedOrder._id, status);

    if (status === 'IN_PRODUCTION') {
      toast.success(`Order from table ${selectedOrder.table} is now in production.`);
    } else {
      toast.success(`Order from table ${selectedOrder.table} marked as delivered.`);
    }

    onOrderStatusChange(selectedOrder._id, status);
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
        onOrderStatusChange={handleChangeOrderStatus}
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
