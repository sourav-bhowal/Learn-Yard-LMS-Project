import { currentUser } from "@clerk/nextjs/server";
import NavBar from "./_components/NavBar";
import SideNavBar from "./_components/SideNavBar";
import { redirect } from "next/navigation";

// DASHBOARD LAYOUT
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // CHECK USER
  const user = await currentUser();
  // IF USER IS LOGGED IN REDIRECT TO HOME
  if (!user) redirect("/sign-in");

  // RETURN
  return (
    <main className="h-full">
      {/* NAVBAR CONTAINER */}
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full">
        <NavBar />
      </div>
      {/* SIDENAVBAR CONTAINER */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <SideNavBar />
      </div>
      {/* MAIN CONTAINER */}
      <div className="md:pl-56 pt-[80px] h-full">{children}</div>
    </main>
  );
}
