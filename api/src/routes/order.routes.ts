import express from "express";
import VerifyToken from "../utils/VerifyToken";
import { createCheckoutSession,stripeWebhookHandler } from "../controllers/order.controller";

const router = express.Router();

router.post(
  "/checkout/create-checkout-session",
  VerifyToken,
  createCheckoutSession
);

router.post("/checkout/webhook",stripeWebhookHandler)

export default router;
