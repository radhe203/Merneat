import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/configs/order-status-config";

type Props = {
  order: Order;
};

function OrderStatusHeader({ order }: Props) {
  function getExpectedDelivery() {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = created.getHours();
    const minutes = created.getMinutes();

    const paddedmin = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedmin}`;
  }

  function getOrderInfo(){
    return ORDER_STATUS.find((o)=> o.value === order.status) || ORDER_STATUS[0]
  }

  return (
    <>
      <h1 className=" text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span>Order Status: {getOrderInfo()?.label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress className=" animate-pulse" value={getOrderInfo()?.progressValue}/>
    </>
  );
}

export default OrderStatusHeader;
