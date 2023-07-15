import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function deleteProduct(request: Request, response: Response) {
  try {
    const { productId } = request.params;

    await Product.deleteOne({ _id: productId });

    response.sendStatus(204);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
