import OrderStatusDetail from "@/components/OrderStatusDetail";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { hideHero } from "@/redux/slices/userSlice";
import { usegetMyOrders } from "@/service/OrderApi";
import { useEffect } from "react";

function OrdersStatus() {
  const { orders, isLoading } = usegetMyOrders();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hideHero());
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  if (!orders || orders.length === 0) {
    return "No orders found";
  }

  return (
    <div className=" space-y-10">
      {orders.map((order) => (
        <div key={order._id} className=" space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetail order={order} />
            <AspectRatio ratio={16/5}>
            <img src={order.restaurant?.imageUrl} className=" h-full w-full object-cover" />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersStatus;
