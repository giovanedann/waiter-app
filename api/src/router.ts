import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createCategory, deleteCategory, listCategories } from './app/use-cases/categories';
import { createProduct, deleteProduct, listProducts } from './app/use-cases/products';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(_request, _file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },

    filename(_request, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// Delete category
router.delete('/categories/:categoryId', deleteCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Delete product
router.delete('/products/:productId', deleteProduct);

// Get products by category
router.get('/categories/:categoryId/products', (request, response) => {
  response.send('Get products by category');
});

// List orders
router.get('/orders', (request, response) => {
  response.send('List orders');
});

// Create order
router.post('/orders', (request, response) => {
  response.send('Create order');
});

// Change order status
router.patch('/orders/:orderId', (request, response) => {
  response.send('Change order status');
});

// Delete/cancel order
router.delete('/orders/:orderId', (request, response) => {
  response.send('Delete/cancel order');
});
