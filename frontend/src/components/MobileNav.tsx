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
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks/hooks";
import { useDispatch } from "react-redux";
import { signOutFaliure, signOutsucsess } from "@/redux/slices/userSlice";
import { toast } from "sonner";

function MobileNav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { baseUrl } = useAppSelector((state) => state.User);
  async function logOut() {
    try {
      const res = await fetch(`${baseUrl}/api/auth/logout`, {
        method: "Post",
        credentials: "include",
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/");
        dispatch(signOutsucsess());
        toast.success(data.message);
      }

      if (!res.ok) {
        dispatch(signOutFaliure(data.message));
        toast.error(data.message);
      }
    } catch (error: any) {
      dispatch(signOutFaliure(error.message));
      console.log(error.message);
      toast.error(error.message);
    }
  }

  const { username } = useAppSelector((state) => state.User);
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {username ? (
            <div className="flex gap-2 items-center cursor-pointer">
              <span className=" text-orange-500 text-xl">
                <FaRegUserCircle />
              </span>
              <span className="font-semibold text-xl hover:text-orange-500">
                {username}
              </span>
            </div>
          ) : (
            <span>Welcome to Merneats.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex space-y-3">
          {username ? (
            <div className="flex flex-col gap-3 w-full text-center ">
              <Link to={"/profile"} className="hover:bg-slate-200 p-2 w-full">
                Profile
              </Link>
              <Link
                to={"/my-restaurants"}
                className="hover:bg-slate-200 p-2 w-full"
              >
                My resturants
              </Link>

              <Button className=" w-full  flex-1 font-bold" onClick={logOut}>
                Log out
              </Button>
            </div>
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
