import { Request, Response, NextFunction } from "express"
import Restaurant from "../models/restaurant"
import cloudinary from "cloudinary"
import ErrorHandler from "../utils/ErrorHandler"
import mongoose from "mongoose"


export async function createRestaurants(req: Request, res: Response, next: NextFunction) {
    try {
        const userId = req.body.userId
        const restaurant = await Restaurant.findOne({ user: userId })

        if (restaurant) {
            return next(ErrorHandler(409, "Already have an restaurant"))
        }

        const image = req.file as Express.Multer.File
        const base64Image = Buffer.from(image.buffer).toString('base64')
        const dataURI = "data:" + image.mimetype + ";base64," + base64Image
        const uploadRes = await cloudinary.v2.uploader.upload(dataURI,{timeout:6000000});
        const imageUrl = uploadRes.url

        const newRestaurent = new Restaurant(req.body)

        newRestaurent.imageUrl = imageUrl
        newRestaurent.user = new mongoose.Types.ObjectId(userId)

        await newRestaurent.save()

        res.status(200).json({ restaurent: newRestaurent, message: "Resaurant Added Successfully" })
    } catch (error:any) {
        next(error)
        console.log(error)
    }

}