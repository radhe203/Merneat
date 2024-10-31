import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import ErrorHandler from "../utils/ErrorHandler";
import Restaurant, { menuItemsSchemaType } from "../models/restaurant";

const STRIPE = new Stripe(process.env.STRIPE_SEC_KEy as string);
const CLIENT_URL = process.env.CLIENT_URL as string;

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

async function createCheckoutSession(req: Request, res: Response, next: NextFunction) {
  try {
    const CheckoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      CheckoutSessionRequest.restaurantId
    );

    if (!restaurant) {
      throw new Error("Restaurant Not Found");
    }

    const LineItems = createLineItems(
      CheckoutSessionRequest,
      restaurant.menuItems
    );

    const session = await CreateSession(
      LineItems,
      "TEST_ORDER_ID",
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if(!session.url){
        return next(ErrorHandler(500,"Error creating Stripe Session"))
    }

    res.json({url:session.url})
  } catch (error: any) {
    console.log(error);
    next(ErrorHandler(500, error?.raw?.message || error.message));
  }
}

export { createCheckoutSession }

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
            currency: "inr",
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
