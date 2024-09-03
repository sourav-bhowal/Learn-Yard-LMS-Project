import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

// AUTH LAYOUT
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // CHECK USER
  const user = await currentUser();
  // IF USER IS LOGGED IN REDIRECT TO HOME
  if (user) redirect("/");

  return (
    <main className="flex h-full items-center justify-center">{children}</main>
  );
}
