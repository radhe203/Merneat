import { useAppSelector } from "@/redux/hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

function CheckOutButton() {
  const location = useLocation();
const navigate = useNavigate()
  const { email, userId, username } = useAppSelector((state) => state.User);

  return (
    <>
      {email && userId && username ? (
        <Button
          variant={"outline"}
          className=" bg-orange-500 text-white font-bold w-full text-lg"
        >
          Checkout
        </Button>
      ) : (
       
          <Button onClick={()=>{
            navigate("/login",{state:{url:location.pathname.toString()}})
          }}
            variant={"outline"}
            className=" bg-orange-500 text-white font-bold w-full text-lg"
          >
            Continue to login
          </Button>
      )}
    </>
  );
}

export default CheckOutButton;
