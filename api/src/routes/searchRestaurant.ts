import express from "express"
import { getRestaurent, searchRestaurant } from "../controllers/searchRestaurants"
const router = express.Router()

router.get('/get/:restaurantId',getRestaurent)
router.get('/:city',searchRestaurant)



export default router