import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StockHistoryRepository {
    static async createStockHistory(data: {
        quantity: number;
        stockDate: Date;
        productId: number;
    }) {
        return prisma.stockHistory.create({
            data,
        });
    }

    static async getStockHistoryByProductId(productId: number) {
        return prisma.stockHistory.findMany({
            where: { productId },
        });
    }
}
