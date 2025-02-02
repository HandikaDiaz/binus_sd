import express from "express"
import RouterProduct from "./product/product"

const MainRouter = express.Router()

MainRouter.use("/product", RouterProduct)

export default MainRouter