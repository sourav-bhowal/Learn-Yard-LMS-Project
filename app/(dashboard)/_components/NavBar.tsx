import NavBarRoutes from "@/components/shared/NavBarRoutes";
import MobileSideBar from "./MobileSideBar";

// NAVBAR COMPONENT
export default function NavBar() {
  return (
    <nav className="p-4 border-b h-full flex items-center shadow-sm">
      {/* MOBILE SIDE BAR */}
      <MobileSideBar />
      {/* NAVBAR ROUTES */}
      <NavBarRoutes />
    </nav>
  );
}
