import express from "express";
// import VerifyToken from "../utils/VerifyToken";
import {
  createRestaurants,
  getRestaurant,
  getRestaurantOrders,
  updateOrderStatus,
  updateRestaurant,
} from "../controllers/restaurants";
import multer from "multer";
import VerifyToken from "../utils/VerifyToken";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});
router.post(
  "/create",
  upload.single("imageFile"),
  VerifyToken,
  createRestaurants
);
router.put(
  "/update/:userId",
  upload.single("imageFile"),
  VerifyToken,
  updateRestaurant
);
router.get("/get/:userId", VerifyToken, getRestaurant);
router.get("/order",VerifyToken,getRestaurantOrders)
router.patch("/order/:orderId/status",VerifyToken,updateOrderStatus)

export default router;
