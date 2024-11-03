import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import ErrorHandler from "../utils/ErrorHandler";
import Restaurant, { menuItemsSchemaType } from "../models/restaurant";
import Order from "../models/order.model";
const STRIPE = new Stripe(process.env.STRIPE_SEC_KEY as string);
const CLIENT_URL = process.env.CLIENT_URL as string;
const STRIPE_WEBHOOK_SEC = process.env.STRIPE_WEBHOOK_SEC as string;
type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    username: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

async function stripeWebhookHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let event;
  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_WEBHOOK_SEC
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`webhook error : ${error.message}`);
  }
  if (event.type === "checkout.session.completed") {
    try {
      const order = await Order.findById(event.data.object.metadata?.OrderId);
      console.log(event.data.object.metadata, "Metadata");
      if (!order) {
        return next(ErrorHandler(400, "Order Not Found"));
      }

      order.totalAmount = event.data.object.amount_total;
      order.status = "Paid";

      await order.save();
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

async function createCheckoutSession(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const CheckoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      CheckoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      throw new Error("Restaurant Not Found");
    }

    const newOrder = new Order({
      restaurant: restaurant,
      username: req.userId,
      status: "Placed",
      deliveryDetails: CheckoutSessionRequest.deliveryDetails,
      cartItems: CheckoutSessionRequest.cartItems,
    });

    const LineItems = createLineItems(
      CheckoutSessionRequest,
      restaurant.menuItems
    );

    const session = await CreateSession(
      LineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session.url) {
      return next(ErrorHandler(500, "Error creating Stripe Session"));
    }
    await newOrder.save();
    res.json({ url: session.url });
  } catch (error: any) {
    console.log(error);
    next(ErrorHandler(500, error?.raw?.message || error.message));
  }
}

async function getMyOrders(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await Order.find({ username: req.userId })
      .populate("restaurant")
      .populate("username");

    res.json(orders);
  } catch (error) {
    console.log(error)
    next(error);
  }
}

export { createCheckoutSession, stripeWebhookHandler, getMyOrders };

// --------------------------------------------------------------------

function createLineItems(
  CheckoutSessionRequest: CheckoutSessionRequest,
  menuItems: menuItemsSchemaType[]
) {
  const lineItems = CheckoutSessionRequest.cartItems.map((cartItem) => {
    const menuitem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuitem) {
      throw new Error(`Menuitem not found : ${cartItem.menuItemId}`);
    }

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "INR",
        unit_amount: menuitem.price,
        product_data: {
          name: menuitem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_items;
  });
  return lineItems;
}

async function CreateSession(
  LineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  OrderId: string,
  deliveryPrice: number,
  restaurantId: string
) {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: LineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "INR",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      OrderId,
      restaurantId,
    },
    success_url: `${CLIENT_URL}/order-status?success=true`,
    cancel_url: `${CLIENT_URL}/detail/${restaurantId}?cancelled=true`,
  });
  return sessionData;
}
