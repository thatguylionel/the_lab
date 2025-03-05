import productClient from '../config/grpc-client';

export interface Product {
  productId: number;
  name: string;
  description: string;
  price: number;
}

export class ProductService {
  async getProduct(productId: number): Promise<Product> {
    return new Promise((resolve, reject) => {
      productClient.getProduct({ product_id: productId }, (error: Error | null, response: Product) => {
        if (error) {
          return reject(error);
        }
        resolve(response);
      });
    });
  }

  async listProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      productClient.listProducts({}, (error: Error | null, response: { products: Product[] }) => {
        if (error) {
          return reject(error);
        }
        resolve(response.products);
      });
    });
  }
}

export default new ProductService();