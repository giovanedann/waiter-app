import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function deleteCategory(request: Request, response: Response) {
  const { categoryId } = request.params;

  await Category.deleteOne({ _id: categoryId });

  response.sendStatus(204);
}
