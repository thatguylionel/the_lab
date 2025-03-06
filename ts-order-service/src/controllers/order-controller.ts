import { Request, Response } from 'express';
import { OrderStatus } from '../models/order';
import orderService from '../services/order-service';

export class OrderController {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { customerId, items } = req.body;

      if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
        res.status(400).json({ error: 'Invalid request. customerId and items array are required.' });
        return;
      }

      const order = await orderService.createOrder({ customerId, items });
      res.status(201).json(order);
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: `Failed to create order: ${error}` });
    }
  }

  getOrderById(req: Request, res: Response): void {
    try {
      const orderId = req.params.id;
      const order = orderService.getOrderById(orderId);

      if (!order) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(order);
    } catch (error) {
      console.error('Error getting order:', error);
      res.status(500).json({ error: `Failed to get order: ${error}` });
    }
  }

  getOrdersByCustomerId(req: Request, res: Response): void {
    try {
      const customerId = req.params.customerId;
      const orders = orderService.getOrdersByCustomerId(customerId);
      res.json(orders);
    } catch (error) {
      console.error('Error getting customer orders:', error);
      res.status(500).json({ error: `Failed to get customer orders: ${error}` });
    }
  }

  getAllOrders(req: Request, res: Response): void {
    try {
      const orders = orderService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error('Error getting all orders:', error);
      res.status(500).json({ error: `Failed to get all orders: ${error}` });
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const { status } = req.body;

      if (!status || !Object.values(OrderStatus).includes(status as OrderStatus)) {
        res.status(400).json({
          error: 'Invalid status. Must be one of: ' + Object.values(OrderStatus).join(', ')
        });
        return;
      }

      const updatedOrder = orderService.updateOrderStatus(orderId, status as OrderStatus);

      if (!updatedOrder) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(updatedOrder);
    } catch (error) {
      console.error('Error updating order status:', error);
      res.status(500).json({ error: `Failed to update order status: ${error}` });
    }
  }

  async addItemToOrder(req: Request, res: Response): Promise<void> {
    try {
      const orderId = req.params.id;
      const { productId, quantity } = req.body;

      if (!productId || !quantity || quantity <= 0) {
        res.status(400).json({ error: 'Invalid request. productId and positive quantity are required.' });
        return;
      }

      const updatedOrder = await orderService.addItemToOrder(orderId, productId, quantity);

      if (!updatedOrder) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(updatedOrder);
    } catch (error) {
      console.error('Error adding item to order:', error);
      res.status(500).json({ error: `Failed to add item to order: ${error}` });
    }
  }

  removeItemFromOrder(req: Request, res: Response): void {
    try {
      const orderId = req.params.id;
      const productId = parseInt(req.params.productId);

      if (isNaN(productId)) {
        res.status(400).json({ error: 'Invalid productId. Must be a number.' });
        return;
      }

      const updatedOrder = orderService.removeItemFromOrder(orderId, productId);

      if (!updatedOrder) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(updatedOrder);
    } catch (error) {
      console.error('Error removing item from order:', error);
      res.status(500).json({ error: `Failed to remove item from order: ${error}` });
    }
  }

  cancelOrder(req: Request, res: Response): void {
    try {
      const orderId = req.params.id;
      const cancelledOrder = orderService.cancelOrder(orderId);

      if (!cancelledOrder) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(cancelledOrder);
    } catch (error) {
      console.error('Error cancelling order:', error);
      res.status(500).json({ error: `Failed to cancel order: ${error}` });
    }
  }

  completeOrder(req: Request, res: Response): void {
    try {
      const orderId = req.params.id;
      const completedOrder = orderService.completeOrder(orderId);

      if (!completedOrder) {
        res.status(404).json({ error: `Order not found with ID: ${orderId}` });
        return;
      }

      res.json(completedOrder);
    } catch (error) {
      console.error('Error completing order:', error);
      res.status(500).json({ error: `Failed to complete order: ${error}` });
    }
  }
}

export default new OrderController();