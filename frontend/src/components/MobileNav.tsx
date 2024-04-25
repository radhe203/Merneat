import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Separator } from "@radix-ui/react-separator";
import { Button } from "./ui/button";

function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className=" text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle><span>Welcome to Merneats.com</span></SheetTitle>
        <Separator/>
        <SheetDescription className="flex space-y-3">
            <Button className=" bg-orange-500 flex-1 font-bold">Log In</Button>
        </SheetDescription>

      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
