import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(request: Request, response: Response) {
  try {
    const {
      category,
      description,
      imagePath,
      ingredients,
      name,
      price
    } = request.body;

    const newProduct = await Product.create({
      category,
      description,
      imagePath,
      ingredients,
      name,
      price
    });

    response.status(201).json(newProduct);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
