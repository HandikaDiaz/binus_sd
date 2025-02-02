import express from "express"
import { ProductController } from "../../controller/product/product.controller";

const RouterProduct = express.Router()

RouterProduct.get('/get-all', ProductController.getAllProducts);
RouterProduct.get('/get/:id', ProductController.getProductById);
RouterProduct.get('/search', ProductController.searchProducts);
RouterProduct.get('/filter', ProductController.filterByStatus);
RouterProduct.get('/stock-history/:id', ProductController.getStockHistory);

RouterProduct.post('/create', ProductController.createProduct);
RouterProduct.put('/update/:id', ProductController.updateProduct);
RouterProduct.put('/update/:id/stock', ProductController.updateStock);
RouterProduct.put('/update/:id/status', ProductController.updateStatus);

export default RouterProduct