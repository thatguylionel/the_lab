import { Request, Response } from 'express';
import productService from '../services/product-service';

export class ProductController {
    async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const products = await productService.listProducts();
            res.json(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: `Failed to fetch products: ${error}` });
        }
    }

    async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = parseInt(req.params.id);

            if (isNaN(productId)) {
                res.status(400).json({ error: 'Invalid product ID format' });
                return;
            }

            const product = await productService.getProduct(productId);
            res.json(product);
        } catch (error: unknown) {
            console.error('Error fetching product:', error);

            // Check if it's a "not found" error from the gRPC service
            if (error instanceof Error && error.message.includes('not found')) {
                res.status(404).json({ error: `Product not found` });
            } else {
                res.status(500).json({ error: `Failed to fetch product: ${error instanceof Error ? error.message : String(error)}` });
            }
        }
    }
}

export default new ProductController();