import express, { Request, Response } from "express"
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"

//mongodb connection
mongoose.connect(process.env.MONGODB_CONNECTION_URI as string)
.then(() => {
    console.log("MongoDB Connected")
}).catch((err) => {
    console.log(err)
})


const app = express()
app.use(express.json())


app.get('/test', (req: Request, res: Response) => {
    res.status(200).json("Jay Shree Ram")
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on 3000 !!")
})

