import { Order, orderStatus } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@radix-ui/react-separator";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ORDER_STATUS } from "@/configs/order-status-config";
import { UseUpdateOrderStatus } from "@/service/RestaurantService";
import { useState } from "react";

type Props = {
  order: Order;
};

function OrderItemCard({ order }: Props) {
  const updateMyOrderStatus = UseUpdateOrderStatus();
  const [status, setStatus] = useState<orderStatus>(order.status);
  const handelStatusChange = async (newStatus: string) => {
    const data = await updateMyOrderStatus({
      orderId: order._id,
      status: newStatus,
    });
    setStatus(data.status);
  };

  const getTime = () => {
    const time = new Date(order.createdAt);

    const hours = time.getHours();
    const min = time.getMinutes();

    const paddedMin = min < 10 ? `0${min}:` : min;

    return `${hours}:${paddedMin}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className=" grid md:grid-cols-4 gap-4 justify-between mb-3">
          <div>
            Customer Name :
            <span className="ml-2 font-normal">
              {order.deliveryDetails.username}
            </span>
          </div>
          <div>
            Delivery Details :
            <span className="ml-2 font-normal">
              {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
            </span>
          </div>
          <div>
            Time :<span className="ml-2 font-normal">{getTime()}</span>
          </div>

          <div>
            Total Cost :
            <span className="ml-2 font-normal">{order.totalAmount}</span>
          </div>
        </CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className=" flex flex-col gap-6">
        <div className=" flex flex-col gap-2">
          {order.cartItems.map((item) => (
            <span key={item.menuItemId}>
              <Badge variant={"outline"} className=" mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
          ))}
        </div>
        <div className=" flex flex-col space-y-1.5">
          <Label htmlFor="status">what is the status of the order</Label>

          <Select
            onValueChange={(value) => handelStatusChange(value as orderStatus)}
            value={status}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent position="popper">
              {ORDER_STATUS.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderItemCard;
