import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function listProducts(_request: Request, response: Response) {
  try {
    const products = await Product.find();

    response.json(products);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
