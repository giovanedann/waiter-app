import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function deleteOrder(request: Request, response: Response) {
  try {
    const { orderId } = request.params;

    await Order.deleteOne({ _id: orderId });

    response.sendStatus(204);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
