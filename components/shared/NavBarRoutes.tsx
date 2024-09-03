"use client";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";

// NAVBAR ROUTES COMPONENT
export default function NavBarRoutes() {
  // PATHNAME
  const pathname = usePathname();

  // TEACHER PAGE
  const isTeacherPage = pathname?.startsWith("/teacher");

  // PLAYER PAGE
  const isPlayerPage = pathname?.includes("/player");

  // RETURNS
  return (
    <div className="flex gap-x-2 ml-auto">
      {/* TEACHER BUTTON */}
      {isTeacherPage || isPlayerPage ? (
        <Link href="/">
          <Button size={"sm"} variant={"outline"}>
            <LogOut className="mr-2 h-4 w-4" />
            Exit
          </Button>
        </Link>
      ) : (
        <Link href="/teacher/courses">
          <Button size={"sm"} variant={"outline"}>
            Sell Courses
          </Button>
        </Link>
      )}
      <UserButton />
    </div>
  );
}
