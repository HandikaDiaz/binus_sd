import express from "express"
import RouterBook from "./product/product"

const MainRouter = express.Router()

MainRouter.use("/product", RouterBook)

export default MainRouter