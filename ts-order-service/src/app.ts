import express from 'express';
import dotenv from 'dotenv';
import orderController from './controllers/order-controller';
import productController from './controllers/product-controller'; // Add this import

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Product routes - add these new routes
app.get('/api/products', productController.getAllProducts.bind(productController));
app.get('/api/products/:id', productController.getProductById.bind(productController));

// Order routes (existing routes)
app.post('/api/orders', orderController.createOrder.bind(orderController));
app.get('/api/orders', orderController.getAllOrders.bind(orderController));
app.get('/api/orders/:id', orderController.getOrderById.bind(orderController));
app.get('/api/customers/:customerId/orders', orderController.getOrdersByCustomerId.bind(orderController));
app.put('/api/orders/:id/status', orderController.updateOrderStatus.bind(orderController));
app.post('/api/orders/:id/items', orderController.addItemToOrder.bind(orderController));
app.delete('/api/orders/:id/items/:productId', orderController.removeItemFromOrder.bind(orderController));
app.post('/api/orders/:id/cancel', orderController.cancelOrder.bind(orderController));
app.post('/api/orders/:id/complete', orderController.completeOrder.bind(orderController));

// Start the server
app.listen(PORT, () => {
  console.log(`ts-order-service running on port ${PORT}`);
  console.log(`Connected to product service via gRPC on ${process.env.PRODUCT_SERVICE_URL || 'localhost:9090'}`);
});