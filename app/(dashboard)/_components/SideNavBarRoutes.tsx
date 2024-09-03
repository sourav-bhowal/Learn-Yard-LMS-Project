"use client";
import { BarChart, Layout, List, Search } from "lucide-react";
import SideNavBarItem from "./SideNavBarItem";
import { usePathname } from "next/navigation";

// GLOBAL ROUTES
const globalRoutes = [
  {
    icon: Layout,
    name: "Home",
    href: "/",
  },
  {
    icon: Search,
    name: "Browse",
    href: "/search",
  },
];

// TEACHER ROUTES
const teacherRoutes = [
  {
    icon: List,
    name: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    name: "Analytics",
    href: "/teacher/analytics",
  },
];

// SIDEBAR ROUTES COMPONENT
export default function SideNavBarRoutes() {
  // PATHNAME
  const pathname = usePathname();

  // TEACHER PAGE
  const isTeacherPage = pathname?.startsWith("/teacher");

  // PLAYER PAGE
  const isPlayerPage = pathname?.includes("/player");

  // ROUTES
  const routes = isTeacherPage ? teacherRoutes : globalRoutes;

  return (
    <main className="flex flex-col w-full">
      {routes.map((route) => (
        // Side NavBar Item Component
        <SideNavBarItem
          key={route.href}
          icon={route.icon}
          name={route.name}
          href={route.href}
        />
      ))}
    </main>
  );
}
