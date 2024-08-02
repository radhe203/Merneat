export type MenuItemType = {
  _id: string;
  name: string;
  price: number;
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
