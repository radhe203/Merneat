import { orderStatus } from "@/types";

type OrderStatusInfo = {
  label: string;
  value: orderStatus;
  progressValue: number;
};

export const ORDER_STATUS: OrderStatusInfo[] = [
  { label: "Placed", value: "Placed", progressValue: 0 },
  {
    label: "Awaiting Restaurant Confirmation",
    value: "Paid",
    progressValue: 25,
  },
  { label: "In Progress", value: "InProgress", progressValue: 50 },
  { label: "Out for Delivery", value: "OutForDelivery", progressValue: 75 },
  { label: "Delivered", value: "Delivered", progressValue: 100 },
];
