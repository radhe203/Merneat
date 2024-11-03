import { Order } from "@/types";
import { Separator } from "./ui/separator";

type Props = {
  order: Order;
};

function OrderStatusDetail({ order }: Props) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col">
        <span className=" font-bold">Delivering to</span>
        <span>{order.deliveryDetails.username}</span>
        <span>
          {order.deliveryDetails.addressLine1},{order.deliveryDetails.city}
        </span>
      </div>
      <div className=" flex flex-col">
        <span className=" font-bold">Your order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li key={item.menuItemId}>
              {item.name} &#10005; {item.quantity}
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className=" flex flex-col">
        <span className=" font-bold">Total</span>
        <span>{order.totalAmmount}</span>
      </div>
    </div>
  );
}

export default OrderStatusDetail;
