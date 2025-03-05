export class OrderItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;

    constructor(productId: number, productName: string, price: number, quantity: number) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
    }
}