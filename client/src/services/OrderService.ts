import { Order } from '../types/Order';
import { customAxios } from './axios/customAxios';

class OrderService {
  async getOrders(): Promise<Order[]> {
    return customAxios.get('/orders').then(({ data }) => data);
  }

  async cancelOrder(orderId: string): Promise<void> {
    return customAxios.delete(`/orders/${orderId}`);
  }
}

export default new OrderService();
