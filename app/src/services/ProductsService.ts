import { Product } from '../types/Product';
import { customAxios } from './axios/customAxios';

class ProductsService {
  async findAll(): Promise<Product[]> {
    const response = await customAxios.get<Product[]>('/products');

    const products = response.data;
    return products;
  }
}

export default new ProductsService();
