import { cuisineList } from "@/configs/restaurants-config";
import { Label } from "./ui/label";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
  onChange: (cuisines: string[]) => void;
  selectedCuisine: string[];
  isExpanded: boolean;
  onExpendedClick: () => void;
};

const CuisineFilter = ({
  onChange,
  selectedCuisine,
  isExpanded,
  onExpendedClick,
}: Props) => {
  function handelCuisineReset() {
    onChange([]);
  }

  function handelCuisineChange(event: ChangeEvent<HTMLInputElement>) {
    const clickedCuisine = event.target.value;
    const isChecked = event.target.checked;

    const newCuisineList = isChecked
      ? [...selectedCuisine, clickedCuisine]
      : selectedCuisine.filter((cuisine) => cuisine !== clickedCuisine);

    onChange(newCuisineList);
  }

  return (
    <>
      <div className=" flex justify-between items-center mb-4">
        <div className=" text-md font-semibold mb-2 ">Filter by cuisine</div>
        <div
          className=" text-md font-semibold mb-2 underline cursor-pointer text-bold text-blue-500"
          onClick={handelCuisineReset}
        >
          Reset Filters
        </div>
      </div>

      <div className="flex flex-col gap-1">
        {cuisineList
          .slice(0, isExpanded ? cuisineList.length : 5)
          .map((cuisine) => {
            const isSelected = selectedCuisine.includes(cuisine);

            return (
              <div key={cuisine} className="">
                <input
                  type="checkbox"
                  id={`cuisine_${cuisine}`}
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handelCuisineChange}
                />
                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? " border border-green-500 text-green-600 "
                      : "border border-slate-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3}></Check>}
                  {cuisine}
                </Label>
              </div>
            );
          })}
        <Button
          variant={"link"}
          className="mt-4 flex-1"
          onClick={onExpendedClick}
        >
          {isExpanded ? (
            <span className=" flex  items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className=" flex  items-center">
              View More <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CuisineFilter;
