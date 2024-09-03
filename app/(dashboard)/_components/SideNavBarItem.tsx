"use client";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// INTERFACE FOR SIDE NAV BAR ITEMS
interface SideNavBarItemProps {
  name: string;
  href: string;
  icon: LucideIcon;
}

// SIDE NAV BAR ITEM COMPONENT
export default function SideNavBarItem({
  name,
  href,
  icon: Icon,
}: SideNavBarItemProps) {
  // GET PATHNAME
  const pathname = usePathname();

  // ROUTER
  const router = useRouter();

  // IS ACTIVE PATHNAME
  const isActivePathname =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  // ON CLICK HANDLER PUSH ROUTE TO ROUTER
  const onClickHandler = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClickHandler}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-primary hover:bg-primary/5",
        isActivePathname && "text-primary bg-primary/15 hover:text-primary"
      )}
    >
      <div className="flex items-center justify-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(isActivePathname && "text-primary")}
        />
        <p>{name}</p>
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-primary h-full transition-all",
          isActivePathname && "opacity-100"
        )}
      />
    </button>
  );
}
