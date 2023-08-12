import { Request, Response } from 'express';

import { Order } from '../../models/Order';
import { io } from '../../../index';

export async function createOrder(request: Request, response: Response) {
  try {
    const { table, products } = request.body;

    const newOrder = await Order.create({ table, products });

    const socketOrderDetails = await newOrder.populate('products.product');

    io.emit('orders@new', socketOrderDetails);

    response.status(201).json(newOrder);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
