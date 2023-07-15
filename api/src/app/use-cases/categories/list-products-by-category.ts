import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProductsByCategory(request: Request, response: Response) {
  const { categoryId } = request.params;

  try {
    const products = await Product.find({ category: { _id: categoryId }});

    response.json(products);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
