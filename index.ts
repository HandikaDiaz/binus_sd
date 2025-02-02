import dotenv from "dotenv"
import express, { Request, Response } from "express"
import cors from "cors"
import MainRouter from "./src/routes";

dotenv.config();

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api", MainRouter)

app.listen(port, () => console.log(`Server running on port ${port}`))