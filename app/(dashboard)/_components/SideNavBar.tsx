import Logo from "./Logo";
import SideNavBarRoutes from "./SideNavBarRoutes";
import { ThemeToggler } from "./ThemeToggler";

// SIDEBAR COMPONENT
export default function SideNavBar() {
  return (
    <nav className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
      {/* LOGO CONTAINER */}
      <section className="p-6">
        <Logo />
      </section>
      {/* SIDEBAR ROUTES CONTAINER */}
      <section className="flex flex-col w-full mt-2">
        <SideNavBarRoutes />
      </section>
      <section className="flex justify-end items-end p-2 w-full h-full">
      <ThemeToggler />
      </section>
    </nav>
  );
}
