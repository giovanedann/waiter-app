import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(_request: Request, response: Response) {
  try {
    const orders = await Order.find()
      .sort({ createdAt: 1 })
      .populate('products.product');

    response.json(orders);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
