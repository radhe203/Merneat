import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks/hooks";

function MobileNav() {
  const {username} = useAppSelector((state)=>state.User)
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
        {username ? (
          <div className="flex gap-2 items-center cursor-pointer">
            <span className=" text-orange-500 text-xl"><FaRegUserCircle  /></span>
            <span className="font-semibold text-xl hover:text-orange-500">{username}</span>
          </div>
        ) : (
          <span>Welcome to Merneats.com</span>
        )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex space-y-3">

        {username ? (
          
          <Button className=" w-full  flex-1 font-bold">
            Log out
          </Button>
        ) : (
          <Link to="/login" className=" w-full">
            {" "}
            <Button className=" w-full bg-orange-500 flex-1 font-bold">
              Login
            </Button>
          </Link>
        )}

          
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
