import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategories(_request: Request, response: Response) {
  try {
    const categories = await Category.find();

    response.json(categories);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
