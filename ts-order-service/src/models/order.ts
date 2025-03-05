import { v4 as uuidv4 } from 'uuid';
import { OrderItem } from './order-item';

export enum OrderStatus {
    CREATED = 'CREATED',
    PROCESSING = 'PROCESSING',
    COMPLETED = 'COMPLETED',
    CANCELLED = 'CANCELLED'
}

export class Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: OrderStatus;
    totalAmount: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(customerId: string, items: OrderItem[]) {
        this.id = uuidv4();
        this.customerId = customerId;
        this.items = items;
        this.status = OrderStatus.CREATED;
        this.totalAmount = this.calculateTotalAmount();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    private calculateTotalAmount(): number {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    updateStatus(status: OrderStatus): void {
        this.status = status;
        this.updatedAt = new Date();
    }

    updateTotalAmount(): void {
        this.totalAmount = this.calculateTotalAmount();
        this.updatedAt = new Date();
    }

    addItem(item: OrderItem): void {
        const existingItem = this.items.find(i => i.productId === item.productId);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }

        this.updateTotalAmount();
    }

    removeItem(productId: number): boolean {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.productId !== productId);

        if (this.items.length !== initialLength) {
            this.updateTotalAmount();
            return true;
        }

        return false;
    }
}