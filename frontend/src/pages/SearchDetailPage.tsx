import CheckOutButton from "@/components/CheckOutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserformData } from "@/forms/user-profileform/UserProfileForm";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { hideHero } from "@/redux/slices/userSlice";
import { useCreateCheckoutSession } from "@/service/OrderApi";
import { CartItemType, MenuItemType, RestaurantType } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect, useState } from "react";
import { FaCity } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function SearchDetailPage() {
  const restaurantId = useParams().restaurantId?.toString();
  const [restaurant, setRestaurant] = useState<RestaurantType>();
  const createSession = useCreateCheckoutSession();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(hideHero());
  }, []);

  const [cartItems, setCartItems] = useState<CartItemType[]>(() => {
    let cart = undefined;

    if (sessionStorage.getItem(`cartItem-${restaurantId}`)) {
      cart = JSON.parse(
        sessionStorage.getItem(`cartItem-${restaurantId}`) as string
      );
    }

    return cart ? cart : [];
  });
  function addTocart(menuItem: MenuItemType) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === menuItem._id);

      let updatedItems: any;
      if (existingItem) {
        updatedItems = prevItems.map((item) =>
          item._id === menuItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...prevItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  }

  const { baseUrl } = useAppSelector((state) => state.User);

  async function getRestaurant(restaurantId: string) {
    try {
      const res = await fetch(`${baseUrl}/api/search/get/${restaurantId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setRestaurant(data);
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    if (restaurantId) {
      getRestaurant(restaurantId);
    }
  }, []);

  function removeFromCart(cartItem: MenuItemType) {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item._id !== cartItem._id
      );

      sessionStorage.setItem(
        `cartItem-${restaurantId}`,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  }

  async function onCheckout(UserformData: UserformData) {
    console.log(UserformData);

    if(!restaurant){
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId : restaurant?._id,
      deliveryDetails : {
        addressLine1 :UserformData.addressLine1,
        username : UserformData.username as string,
        email: UserformData.email  as string,
        city:UserformData.city
      }
    };
    const data = await createSession(checkoutData)
    window.location.href = data.url
  }

  return (
    <div className=" flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          className=" rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className=" flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className=" text-2xl font-bold tracking-tight ">Menu</span>
          {restaurant?.menuItems?.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              key={menuItem?.name}
              addTocart={addTocart}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckOutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

SearchDetailPage.propTypes = {};

export default SearchDetailPage;
