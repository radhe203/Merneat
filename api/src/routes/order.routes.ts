import express from "express";
import VerifyToken from "../utils/VerifyToken";
import {
  createCheckoutSession,
  getMyOrders,
  stripeWebhookHandler,
} from "../controllers/order.controller";

const router = express.Router();

router.get("/", VerifyToken, getMyOrders);

router.post(
  "/checkout/create-checkout-session",
  VerifyToken,
  createCheckoutSession
);
router.post("/checkout/webhook", stripeWebhookHandler);

export default router;
