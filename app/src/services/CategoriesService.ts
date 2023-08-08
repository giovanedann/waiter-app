import { Category } from '../types/Category';
import { Product } from '../types/Product';
import { customAxios } from './axios/customAxios';

class CategoriesService {
  async findAll(): Promise<Category[]> {
    const response = await customAxios.get<Category[]>('/categories');

    const categories = response.data;
    return categories;
  }

  async findProductsByCategoryId(categoryId: string): Promise<Product[]> {
    const response = await customAxios.get<Product[]>(
      `/categories/${categoryId}/products`
    );

    return response.data;
  }
}

export default new CategoriesService();
