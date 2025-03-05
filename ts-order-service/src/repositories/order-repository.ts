import { Order, OrderStatus } from '../models/order';

class OrderRepository {
  private orders: Map<string, Order> = new Map();

  findAll(): Order[] {
    return Array.from(this.orders.values());
  }

  findById(id: string): Order | undefined {
    return this.orders.get(id);
  }

  findByCustomerId(customerId: string): Order[] {
    return this.findAll().filter(order => order.customerId === customerId);
  }

  findByStatus(status: OrderStatus): Order[] {
    return this.findAll().filter(order => order.status === status);
  }

  save(order: Order): Order {
    this.orders.set(order.id, order);
    return order;
  }

  delete(id: string): boolean {
    return this.orders.delete(id);
  }
}

export default new OrderRepository();