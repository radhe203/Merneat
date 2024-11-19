import { MenuItemType } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type Props = {
  menuItem: MenuItemType;
  addTocart: (menuItem: MenuItemType) => void;
};

const MenuItem = ({ menuItem, addTocart }: Props) => {
  return (
    <Card className=" cursor-pointer" onClick={() => addTocart(menuItem)}>
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className=" font-bold">${menuItem.price}</CardContent>
    </Card>
  );
};

export default MenuItem;
