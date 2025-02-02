import { PrismaClient, Status } from '@prisma/client';

const prisma = new PrismaClient();

export class ProductRepository {
    static async getAllProducts() {
        return prisma.product.findMany();
    }

    static async getProductById(productId: number) {
        return prisma.product.findUnique({
            where: { id: productId },
        });
    }

    static async filterByStatus(status: Status) {
        return prisma.product.findMany({
            where: { status },
        });
    }

    static async searchProducts(productName: string) {
        return prisma.product.findMany({
            where: {
                productName: {
                    contains: productName,
                    mode: 'insensitive',
                },
            },
        });
    }

    static async createProduct(data: {
        productName: string;
        quantity: number;
        price: number;
        status: string;
        isbn: string;
        description: string;
    }) {
        return prisma.product.create({
            data: {
                ...data,
                status: data.status as Status,
            },
        });
    }

    static async updateProduct(productId: number, data: any) {
        return prisma.product.update({
            where: { id: productId },
            data,
        });
    }
}
