import { useAppSelector } from "@/redux/hooks/hooks";
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

  const CreateCheckoutSession = async (CheckoutSessionRequest: CheckoutSessionRequest) => {
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
      const data = await res.json()
      return data
    } catch (error: any) {
      toast.error(error.toString());
      console.error(error);
    }
  };

  return CreateCheckoutSession
}
