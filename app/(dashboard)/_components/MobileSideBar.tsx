import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import SideNavBar from "./SideNavBar";

// MOBILE SIDE BAR COMPONENT
export default function MobileSideBar() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <SideNavBar />
      </SheetContent>
    </Sheet>
  );
}
