import { Category } from '../types/Category';
import { customAxios } from './axios/customAxios';

class CategoriesService {
  async findAll(): Promise<Category[]> {
    const response = await customAxios.get<Category[]>('/categories');

    const categories = response.data;
    return categories;
  }
}

export default new CategoriesService();
