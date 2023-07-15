import { Request, Response } from 'express';
import { Order } from '../../models/Order';

export async function createOrder(request: Request, response: Response) {
  try {
    const { table, products } = request.body;

    const newOrder = await Order.create({ table, products });

    response.status(201).json(newOrder);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
