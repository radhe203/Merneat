import { timeStamp } from "console";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    username: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deliveryDetails: {
      email: { type: String, required: true },
      addressLine1: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        menuItemId: { type: String, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["Placed", "Paid", "InProgress", "OutForDelivery", "Delivered"],
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
