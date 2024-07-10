import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant";
import ErrorHandler from "../utils/ErrorHandler";

export async function getRestaurent(req: Request, res: Response, next: NextFunction) {
    const restaurantId = req.params.restaurantId

    if(!restaurantId){
        return next(ErrorHandler(400,"Id is required"))
    }

    try {
        const restaurant = await Restaurant.findById(restaurantId)

        if (!restaurant) {
            next(ErrorHandler(404, "Restaurant not found"))
        }

        res.status(200).json(restaurant)
    } catch (error) {
        next(error)
    }

}


export async function searchRestaurant(req: Request, res: Response, next: NextFunction) {
    try {
        const city = req.params.city;
        if(!city){
            return next(ErrorHandler(400,"City is required"))
        }

        const searchQuery = (req.query.searchQuery as string) || ""
        const selectedCuisines = (req.query.selectedCuisines as string) || ""
        const sortOptions = (req.query.sortOptions as string) || "lastUpdated"
        const page = parseInt(req.query.page as string) || 1

        let query: any = {}

        query["city"] = new RegExp(city, 'i')



        const cityCheck = await Restaurant.countDocuments(query)


        if (cityCheck === 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1,
                }
            })
        }

        if (selectedCuisines) {
            const cuisineArray = selectedCuisines.split(",").map((cuisine) => (new RegExp(cuisine, "i")))
            query["cuisines"] = { $all: cuisineArray }
        }


        if (searchQuery) {
            const searchRegex = new RegExp(searchQuery, "i")
            query["$or"] = [
                { restaurantName: searchRegex },
                { cuisines: { $in: [searchRegex] } }
            ]
        }


        const pagesize = 10

        const skip = (page - 1) * pagesize

        const restaurants = await Restaurant.find(query).sort({ [sortOptions]: 1 }).skip(skip).limit(pagesize).lean()
        const total = await Restaurant.countDocuments(query)
        const Response = {
            data: restaurants,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pagesize)
            }

        }

        res.status(200).json(Response)
    } catch (error) {
        next(error)
    }

}