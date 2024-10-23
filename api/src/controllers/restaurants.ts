import { Request, Response, NextFunction } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/ErrorHandler";
import mongoose from "mongoose";

async function uploadImage(image: Express.Multer.File) {
  try {
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = "data:" + image.mimetype + ";base64," + base64Image;
    const uploadRes = await cloudinary.v2.uploader.upload(dataURI, {
      timeout: 6000000,
    });
    return uploadRes.url;
  } catch (error) {
    console.log(error);
  }
}

export async function createRestaurants(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.userId;
    const restaurant = await Restaurant.findOne({ user: userId });

    if (restaurant) {
      return next(ErrorHandler(409, "Already have an restaurant"));
    }

    const imageUrl = await uploadImage(req.file as Express.Multer.File);

    const newRestaurent = new Restaurant(req.body);
    newRestaurent.imageUrl = imageUrl as string;
    newRestaurent.user = new mongoose.Types.ObjectId(userId);
    await newRestaurent.save();

    res
      .status(200)
      .json({
        restaurent: newRestaurent,
        message: "Resaurant Added Successfully",
      });
  } catch (error: any) {
    next(error);
  }
}
export async function getRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.params.userId?.toString();
  const id = req.userId;
  if (id !== user) {
    return next(ErrorHandler(401, "Unauthorised"));
  }

  try {
    const restaurant = await Restaurant.findOne({ user });
    if (!restaurant) {
      return next(ErrorHandler(400, "You have no restaurent"));
    }
    res.status(200).json(restaurant);
  } catch (error) {
    next(error);
  }
}

export async function updateRestaurant(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.params.userId;
  const id = req.userId;
  const {
    restaurantName,
    city,
    country,
    deliveryPrice,
    estimatedDeliveryTime,
    cuisines,
    menuItems,
  } = req.body;
  if (id !== userId) {
    return next(ErrorHandler(401, "Unauthorised"));
  }

  try {
    const restaurant = await Restaurant.findOne({ user: userId });
    if (!restaurant) {
      return next(ErrorHandler(400, "You have no restaurent"));
    }

    let imageUrl;

    if (req.file) {
      imageUrl = await uploadImage(req.file as Express.Multer.File);
    }
    await Restaurant.findOneAndUpdate(
      { user: userId },
      {
        $set: {
          ...(restaurantName && { restaurantName }),
          ...(city && { city }),
          ...(country && { country }),
          ...(deliveryPrice && { deliveryPrice }),
          ...(estimatedDeliveryTime && { estimatedDeliveryTime }),
          ...(cuisines && { cuisines }),
          ...(menuItems && { menuItems }),
          ...(imageUrl && { imageUrl }),
        },
      }
    );
    res.status(200).json({ message: "Restaurant updated" });
  } catch (error) {
    next(error);
    console.log(error);
  }
}
