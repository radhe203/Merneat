import ManageRestaurantForm from "@/components/ManageRestaurantForm";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { hideHero } from "@/redux/slices/userSlice";
import { useGetMyRestaurantOrders } from "@/service/RestaurantService";
import { useEffect } from "react";

const Restaurent = () => {
  const dispatch = useAppDispatch();
  const { orders, loading } = useGetMyRestaurantOrders();
  useEffect(() => {
    dispatch(hideHero());
  }, []);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-restaurant">Restaurant</TabsTrigger>
      </TabsList>
      <TabsContent
        value="orders"
        className=" space-y-5 bg-gray-100 rounded-lg pg-10"
      >
        {loading ? (
          <span>Loading Orders...</span>
        ) : (
          <>
            <h2 className="text-2xl font-bold">
              {orders?.length || 0} Active Orders
            </h2>
            {
              orders?.map((order)=>(
                <OrderItemCard order={order} key={order._id}/>
              ))
            }
          </>
        )}
      </TabsContent>
      <TabsContent value="manage-restaurant">
        <ManageRestaurantForm />
      </TabsContent>
    </Tabs>
  );
};

export default Restaurent;

// name={preData?.restaurantName} city={preData?.city} country={preData?.country} deliveryPrice={preData?.deliveryPrice} estimatedDeliveryTime={preData?.estimatedDeliveryTime}
{
  /* ; */
}
