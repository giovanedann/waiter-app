import { useState } from 'react';
import { Order } from '../types/Order';
import { OrderModal } from './OrderModal';
import OrderService from '../services/OrderService';
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
    <div className="p-4 border-gray-500/30 border rounded-2xl flex flex-col items-center flex-1">
      <header className="p-2 text-sm flex items-center gap-2">
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
        <div className="flex flex-col w-full mt-6">
          {orders.map((order) => (
            <button
              className="flex flex-col justify-center items-center bg-white border border-gray-500/30 rounded-lg h-32 w-full gap-1 [&:not(:first-of-type)]:mt-6"
              type="button"
              key={order._id}
              onClick={() => handleOpenModal(order)}
            >
              <strong className="font-medium">Table {order.table}</strong>
              <span className="text-sm text-gray-600">{order.products.length} items</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
