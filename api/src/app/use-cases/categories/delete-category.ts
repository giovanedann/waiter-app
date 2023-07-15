import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function deleteCategory(request: Request, response: Response) {
  try {
    const { categoryId } = request.params;

    await Category.deleteOne({ _id: categoryId });

    response.sendStatus(204);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
