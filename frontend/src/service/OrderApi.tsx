import { useAppSelector } from "@/redux/hooks/hooks";
import { Order } from "@/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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

export function useCreateCheckoutSession() {
  const { baseUrl } = useAppSelector((state) => state.User);

  const CreateCheckoutSession = async (
    CheckoutSessionRequest: CheckoutSessionRequest
  ) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/order/checkout/create-checkout-session`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(CheckoutSessionRequest),
        }
      );

      if (!res.ok) {
        throw new Error("Unable to create checkout session");
      }
      const data = await res.json();
      return data;
    } catch (error: any) {
      toast.error(error.toString());
      console.error(error);
    }
  };

  return CreateCheckoutSession;
}

export function usegetMyOrders() {
  const { baseUrl } = useAppSelector((state) => state.User);
  const [orders, setOrders] = useState<Order[]>();
  let isLoading = false;
  const getMyOrders = async () => {
    try {
      isLoading = true;
      const res = await fetch(`${baseUrl}/api/order`, {
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      isLoading = false;
      return data;
    } catch (error: any) {
      isLoading = false;
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const intervalRef = useRef(null);

  useEffect(() => {
    async function getOrder() {
      const orders = await getMyOrders();
      setOrders(orders);
    }
    getOrder();
    const interval = setInterval(getOrder, 5000);

    return () => clearInterval(interval);
  }, []);
  return { orders, isLoading };
}
