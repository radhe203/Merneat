import { useAppSelector } from "@/redux/hooks/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserformData,
} from "@/forms/user-profileform/UserProfileForm";

type Props = {
  onCheckout: (UserformData: UserformData) => void;
  disabled: boolean;
};

function CheckOutButton({ onCheckout, disabled }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, userId, username } = useAppSelector((state) => state.User);

  if (!email && !userId && !username) {
    return (
      <Button
        onClick={() => {
          navigate("/login", {
            state: { url: location.pathname.toString() },
          });
        }}
        variant={"outline"}
        className=" bg-orange-500 text-white font-bold w-full text-lg"
      >
        Continue to login
      </Button>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className=" bg-orange-500 flex-1">
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className=" max-w-[425px] md:min-w-[700px] bg-gray-500">
        <UserProfileForm
          onSave={onCheckout}
          tittle="Confirm Delivery Details"
          buttonText="Continue to Payment"
        />
      </DialogContent>
    </Dialog>
  );
}

export default CheckOutButton;
