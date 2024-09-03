import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

// METADATA
export const metadata: Metadata = {
  title: "My Courses",
};

// COURSES PAGE
export default function CoursesPage() {
  return (
    <div>
      <Link href={"/teacher/create-new-course"}>
        <Button>New Course</Button>
      </Link>
    </div>
  );
}
