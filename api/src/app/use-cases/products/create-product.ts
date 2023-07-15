import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProduct(request: Request, response: Response) {
  const imagePath = request.file?.filename;

  try {
    const {
      category,
      description,
      ingredients,
      name,
      price
    } = request.body;

    const newProduct = await Product.create({
      category,
      description,
      imagePath,
      ingredients: JSON.parse(ingredients),
      name,
      price: Number(price)
    });

    response.status(201).json(newProduct);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
