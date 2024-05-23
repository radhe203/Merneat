import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import authRouter from "../src/routes/auth"
import cookieParser from "cookie-parser"
//mongodb connection
mongoose.connect(process.env.MONGODB_CONNECTION_URI as string)
    .then(() => {
        console.log("MongoDB Connected")
    }).catch((err) => {
        console.log(err)
    })


const app = express()
app.use(express.urlencoded({extended:true}))
// app.use(cors({
//     origin: process.env.CLIENT_LINK,
//     credentials: true
// }))
app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use('/api/auth', authRouter)



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

