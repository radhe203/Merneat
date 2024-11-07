import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import ErrorHandler from "../utils/ErrorHandler";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let message = "";
    errors.array().map((error: any) => {
      if (error.type === "field") {
        message += `${error.path} : ${error.msg}, `;
      } else {
        message += `${error.msg} ,`;
      }
    });

    return next(ErrorHandler(400, message));
  }
  next();
};

export const validateSignup = [
  body("username").isString().notEmpty().withMessage("Username must be string"),
  body("email").isEmail().withMessage("Must be an email"),
  body("password")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/,
      "i"
    )
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  handleValidationErrors,
];

export const validateLogin = [
  body("password")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[0-9a-zA-Z@$!%*?&]{8,}$/,
      "i"
    )
    .withMessage(
      "Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long"
    ),
  body("email").isEmail().withMessage("Must be an email"),
  handleValidationErrors,
];

export const validateProfile = [
  body("username").isString().notEmpty().withMessage("Username must be string"),
  body("email").isEmail().withMessage("Must be an email"),
  body("addressLine1").isString().withMessage("addressLine1 must be string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationErrors,
];

export const validateRestaurant = [
  body("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("deliveryPrice")
    .isFloat({ min: 0 })
    .withMessage("Delivery price must be a positive number"),
  body("estimatedDeliveryTime")
    .isInt({ min: 0 })
    .withMessage("Estimated delivery time must be a postivie integar"),
  body("cuisines")
    .isArray()
    .withMessage("Cuisines must be an array")
    .not()
    .isEmpty()
    .withMessage("Cuisines array cannot be empty"),
  body("menuItems").isArray().withMessage("Menu items must be an array"),
  body("menuItems.*.name").notEmpty().withMessage("Menu item name is required"),
  body("menuItems.*.price")
    .isFloat({ min: 0 })
    .withMessage("Menu item price is required and must be a postive number"),
  handleValidationErrors,
];
