import { customAxios } from './axios/customAxios';

type ConfirmOrderParams = {
  table: string;
  products: { product: string, quantity: number }[]
}

class OrderService {
  async confirmOrder({ table, products }: ConfirmOrderParams): Promise<unknown> {
    return await customAxios.post('/orders', {
      table,
      products
    });
  }
}

export default new OrderService();
