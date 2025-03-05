import { Order, OrderStatus } from '../models/order';
import { OrderItem } from '../models/order-item';
import orderRepository from '../repositories/order-repository';
import productService from './product-service';

interface CreateOrderItem {
  productId: number;
  quantity: number;
}

interface CreateOrderRequest {
  customerId: string;
  items: CreateOrderItem[];
}

export class OrderService {
  async createOrder(orderRequest: CreateOrderRequest): Promise<Order> {
    const orderItems: OrderItem[] = [];

    // Fetch product details and create order items
    for (const item of orderRequest.items) {
      try {
        const product = await productService.getProduct(item.productId);

        const orderItem = new OrderItem(
          product.productId,
          product.name,
          product.price,
          item.quantity
        );

        orderItems.push(orderItem);
      } catch (error) {
        throw new Error(`Failed to fetch product with ID ${item.productId}: ${error}`);
      }
    }

    // Create the order with the items
    const order = new Order(orderRequest.customerId, orderItems);

    // Save the order
    return orderRepository.save(order);
  }

  getOrderById(orderId: string): Order | undefined {
    return orderRepository.findById(orderId);
  }

  getOrdersByCustomerId(customerId: string): Order[] {
    return orderRepository.findByCustomerId(customerId);
  }

  getAllOrders(): Order[] {
    return orderRepository.findAll();
  }

  updateOrderStatus(orderId: string, status: OrderStatus): Order | undefined {
    const order = orderRepository.findById(orderId);

    if (order) {
      order.updateStatus(status);
      orderRepository.save(order);
    }

    return order;
  }

  async addItemToOrder(orderId: string, productId: number, quantity: number): Promise<Order | undefined> {
    const order = orderRepository.findById(orderId);

    if (!order) {
      return undefined;
    }

    try {
      const product = await productService.getProduct(productId);

      const orderItem = new OrderItem(
        product.productId,
        product.name,
        product.price,
        quantity
      );

      order.addItem(orderItem);
      return orderRepository.save(order);
    } catch (error) {
      throw new Error(`Failed to add item to order: ${error}`);
    }
  }

  removeItemFromOrder(orderId: string, productId: number): Order | undefined {
    const order = orderRepository.findById(orderId);

    if (!order) {
      return undefined;
    }

    const removed = order.removeItem(productId);

    if (removed) {
      return orderRepository.save(order);
    }

    return order;
  }

  cancelOrder(orderId: string): Order | undefined {
    return this.updateOrderStatus(orderId, OrderStatus.CANCELLED);
  }

  completeOrder(orderId: string): Order | undefined {
    return this.updateOrderStatus(orderId, OrderStatus.COMPLETED);
  }
}

export default new OrderService();