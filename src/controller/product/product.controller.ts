import { Request, Response } from 'express';
import { ProductService } from '../../service/product/product.service';
import { Status } from '@prisma/client';

export class ProductController {
    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getAllProducts();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getProductById(req: Request, res: Response) {
        const productId = parseInt(req.params.id);
        try {
            const product = await ProductService.getProductById(productId);
            if (!product) {
                res.status(404).json({ error: 'Product not found' });
                return
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async getStockHistory(req: Request, res: Response) {
        const productId = parseInt(req.params.id);
        try {
            const stockHistory = await ProductService.getStockHistory(productId);
            res.status(200).json(stockHistory);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async filterByStatus(req: Request, res: Response) {
        const { status } = req.query;
        try {
            const products = await ProductService.filterByStatus(status as Status);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async searchProducts(req: Request, res: Response) {
        const { productName } = req.query;
        try {
            const products = await ProductService.searchProducts(productName as string);
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async createProduct(req: Request, res: Response) {
        try {
            const product = await ProductService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        const productId = parseInt(req.params.id);
        try {
            const product = await ProductService.updateProduct(productId, req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async updateStatus(req: Request, res: Response) {
        const productId = parseInt(req.params.id);
        const { status } = req.body;
        try {
            const product = await ProductService.updateProduct(productId, { status });
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ error });
        }
    }

    static async updateStock(req: Request, res: Response) {
        const productId = parseInt(req.params.id);
        const { quantity } = req.body;
        try {
            await ProductService.updateStock(productId, quantity);
            res.status(200).json({ message: 'Stock updated successfully' });
        } catch (error) {
            res.status(500).json({ error });
        }
    }
}
