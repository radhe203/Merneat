import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { useAppSelector } from "@/redux/hooks/hooks";
import { FaRegUserCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import "./Header.css";
import { useDispatch } from "react-redux";
import { signOutFaliure, signOutsucsess } from "@/redux/slices/userSlice";
import { toast } from "sonner";
const Header = () => {
  const { username,baseUrl } = useAppSelector((state) => state.User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function logOut() {
    try {
      const res = await fetch(`${baseUrl}/api/auth/logout`);
      const data = await res.json();

      if (res.ok) {
        navigate("/");
        dispatch(signOutsucsess());
        document.cookie = 'merneat_auth_token='
        toast.success(data.message)

      }

      if (!res.ok) {
        dispatch(signOutFaliure(data.message));
        toast.error(data.message)

      }
    } catch (error: any) {
      dispatch(signOutFaliure(error.message));
      console.log(error.message);
      toast.error(error.message)

    }
  }

  return (
    <div className="border-b-2 border-b-orange-500 py-6">
      <nav className=" container mx-auto flex justify-between item-center">
        <Link
          to={"/"}
          className="text-3xl text-orange-500 tracking-tight font-bold"
        >
          Merneat.com
        </Link>
        {username ? (
          <div className=" user">
            <div className="hidden md:flex gap-2 items-center cursor-pointer ">
              <span className=" text-orange-500 text-3xl">
                <FaRegUserCircle />
              </span>
              <span className="font-semibold text-xl hover:text-orange-500">
                {username}
              </span>
            </div>
            <div className="hidden flex-col gap-1 px-3 py-6 shadow-2xl rounded-md absolute bg-white w-[180px] text-center user-detail">
              <Link to={"/profile"} className="hover:bg-slate-200 p-2">
                Profile
              </Link>
              <Link to={"/my-resturants"} className="hover:bg-slate-200 p-2">
                My resturants
              </Link>
              <Button className=" w-full  flex-1 font-bold" onClick={logOut}>
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <Link
            to={"/login"}
            className="hidden md:block font-semibold text-xl hover:text-orange-500"
          >
            Log in
          </Link>
        )}
        <div className=" md:hidden text-3xl">
          <MobileNav />
        </div>
      </nav>
    </div>
  );
};

export default Header;
