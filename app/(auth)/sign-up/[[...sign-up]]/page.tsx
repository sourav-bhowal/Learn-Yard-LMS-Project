import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

// METADATA
export const metadata: Metadata = {
  title: "Sign Up",
};

// SIGN UP PAGE
export default function SignUpPage() {
  return <SignUp />;
}
