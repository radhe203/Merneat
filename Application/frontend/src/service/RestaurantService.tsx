import { useAppSelector } from "@/redux/hooks/hooks";
import { Order } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function useGetMyRestaurantOrders() {
  const { baseUrl } = useAppSelector((state) => state.User);
  const [orders, setOrders] = useState<Order[]>();
  let [loading, setLoading] = useState<boolean>(true);
  const GetMyRestaurantOrders = async (): Promise<Order[]> => {
    const res = await fetch(`${baseUrl}/api/restaurants/order`, {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      setLoading(false);
      toast.error(data.message);
      throw new Error(data.message);
    }
    setLoading(false);
    return data;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const order = await GetMyRestaurantOrders();
      setOrders(order);
    };

    fetchOrders();
  }, []);

  return { orders, loading };
}

type UpdateOrderStatusReq = {
  orderId: string;
  status: string;
};

export function UseUpdateOrderStatus() {
  const { baseUrl } = useAppSelector((state) => state.User);
  const updateMyOrderStatus = async (
    updateOrderStatusReq: UpdateOrderStatusReq
  ) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/restaurants/order/${updateOrderStatusReq.orderId}/status`,
        {
          method: "PATCH",
          credentials:"include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: updateOrderStatusReq.status }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }
      if (res.ok) {
        toast.success("Status Updated !!");
        return data;
      }
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };

  return updateMyOrderStatus;
}
