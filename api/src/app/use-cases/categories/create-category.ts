import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function createCategory(request: Request, response: Response) {
  try {
    const { icon, name } = request.body;

    const newCategory = await Category.create({ icon, name });

    response.status(201).json(newCategory);
  } catch {
    response.status(500).json({ error: 'Internal server error' });
  }
}
