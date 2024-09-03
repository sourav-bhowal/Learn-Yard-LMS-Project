import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

// METADATA
export const metadata: Metadata = {
  title: "Sign In",
};

// SIGN IN PAGE
export default function SignInPage() {
  return <SignIn />;
}
