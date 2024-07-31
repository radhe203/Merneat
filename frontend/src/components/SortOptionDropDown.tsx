import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type Props = {
  onChange: (value: string) => void;
  sortOption: string;
};

const SORT_OPTIONS = [
  {
    label: "Best match",
    value: "bestMatch",
  },
  {
    label: "Delivery Price",
    value: "deliveryPrice",
  },
  {
    label: "Estimated Delivery Time",
    value: "estimatedDeliveryTime",
  },
];

function SortOptionDropDown({ onChange, sortOption }: Props) {

    const sortlabel = SORT_OPTIONS.find((option)=> option.value === sortOption)?.label || SORT_OPTIONS[0].label

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" cursor-pointer">
        <Button variant={"outline"} className=" w-full">
          Sort by : {sortlabel}
        </Button>
        <DropdownMenuContent>
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuItem
              key={option.value}
              className=" cursor-pointer "
              onClick={() => onChange(option.value)}
            >
                {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}

SortOptionDropDown.propTypes = {};

export default SortOptionDropDown;
