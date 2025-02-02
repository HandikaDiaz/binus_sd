import { Status } from "@prisma/client";
import { ProductRepository } from "../../repository/product/product.repository";
import { StockHistoryRepository } from "../../repository/product/stock.history";

export class ProductService {
    static async getAllProducts() {
        return ProductRepository.getAllProducts();
    }

    static async getProductById(productId: number) {
        return ProductRepository.getProductById(productId);
    }

    static async getStockHistory(productId: number) {
        return StockHistoryRepository.getStockHistoryByProductId(productId);
    }

    static async filterByStatus(status: Status) {
        return ProductRepository.filterByStatus(status);
    }

    static async searchProducts(productName: string) {
        return ProductRepository.searchProducts(productName);
    }

    static async createProduct(data: {
        productName: string;
        quantity: number;
        price: number;
        status: string;
        isbn: string;
        description: string;
    }) {
        const product = await ProductRepository.createProduct(data);

        await StockHistoryRepository.createStockHistory({
            quantity: data.quantity,
            stockDate: new Date(),
            productId: product.id,
        });

        return product;
    }

    static async updateProduct(productId: number, data: any) {
        return ProductRepository.updateProduct(productId, data);
    }

    static async updateStatus(productId: number, status: string) {
        const product = await ProductRepository.getProductById(productId);
        if (!product) throw new Error('Product not found');

        return ProductRepository.updateProduct(productId, { status });
    }

    static async updateStock(productId: number, quantity: number) {
        const product = await ProductRepository.getProductById(productId);
        if (!product) throw new Error('Product not found');

        const updatedQuantity = product.quantity + quantity;

        await ProductRepository.updateProduct(productId, {
            quantity: updatedQuantity,
        });

        await StockHistoryRepository.createStockHistory({
            quantity,
            stockDate: new Date(),
            productId,
        });
    }
}
