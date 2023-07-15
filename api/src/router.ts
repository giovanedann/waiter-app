import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { createCategory, deleteCategory, listCategories } from './app/use-cases/categories';
import { createProduct, deleteProduct, listProducts } from './app/use-cases/products';
import { listProductsByCategory } from './app/use-cases/categories/list-products-by-category';
import { changeOrderStatus, createOrder, deleteOrder, listOrders } from './app/use-cases/orders';

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
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', deleteOrder);
