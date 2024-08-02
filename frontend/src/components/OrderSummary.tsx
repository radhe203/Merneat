import { CartItemType, MenuItemType, RestaurantType } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: RestaurantType | undefined;
  cartItems: CartItemType[];
  removeFromCart: (cartItem: MenuItemType) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  function getTotalcost(): number {
    const ItemCost = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const subTotal = ItemCost + (restaurant ? restaurant.deliveryPrice : 0);
    return subTotal;
  }

  return (
    <>
      <CardHeader>
        <CardTitle className=" text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalcost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-5">
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className=" flex items-center gap-1">
              <Trash
                color="red"
                size={20}
                className=" cursor-pointer"
                onClick={() => removeFromCart(item)}
              />
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <Separator />
        <div className="flex justify-between ">
          <span>Delivery</span>
          <span>${restaurant?.deliveryPrice}</span>
        </div>
      </CardContent>
    </>
  );
};

export default OrderSummary;
