import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

// HOME PAGE
export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <p className="text-3xl text-green-500">Hello</p>
      <UserButton />
      <Button>Button</Button>
    </main>
  );
}
