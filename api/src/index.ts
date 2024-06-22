import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import authRouter from "../src/routes/auth"
import restaurantRouter from "../src/routes/restaurants"
import cookieParser from "cookie-parser"
import { v2 as cloudinary } from "cloudinary"
import path from "path"
//mongodb connection
mongoose.connect(process.env.MONGODB_CONNECTION_URI as string)
    .then(() => {
        console.log("MongoDB Connected")
    }).catch((err) => {
        console.log(err)
    })

// cloudinary 

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use(express.static(path.join(__dirname, "../../frontend/dist")))
app.use('/api/auth', authRouter)
app.use('/api/restaurants', restaurantRouter)


app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500
    const message = err.message || "Intrernal Server Error"
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on 3000 !!")
})

