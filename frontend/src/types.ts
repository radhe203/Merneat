export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
};

export type UserType = {
  _id: string;
  email: string;
  username: string;
  addressLine1: string;
  city: string;
  country: string;
};

export type RestaurantType = {
  _id: string;
  user: string;
  restaurantName: string;
  city: string;
  country: string;
  deliveryPrice: number;
  estimatedDeliveryTime: number;
  cuisines: string[];
  menuItems: MenuItemType[];
  imageUrl: string;
  lastUpdated: string;
};

export type CartItemType = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

export type orderStatus =
  | "Placed"
  | "Paid"
  | "InProgress"
  | "OutForDelivery"
  | "Delivered";

export type Order = {
  _id: string;
  restaurant: RestaurantType;
  user: UserType;
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    username: string;
    addressLine1: string;
    city: string;
    email: string;
  };
  totalAmmount: number;
  status: orderStatus;
  createdAt: string;
  updatedAt: string;
  restaurantId: string;
};
