import express from "express";
import VerifyToken from "../utils/VerifyToken";
import { createCheckoutSession } from "../controllers/order.controller";

const router = express.Router();

router.post(
  "checkout/create-checkout-session",
  VerifyToken,
  createCheckoutSession
);

export default router;
