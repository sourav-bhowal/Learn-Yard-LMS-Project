import { IconBadge } from "@/components/shared/IconBadge";
import { prisma } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";

// COURSE PAGE
export default async function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  // GET USER
  const { userId } = auth();

  // IF USER NOT LOGGED IN, REDIRECT TO HOME
  if (!userId) redirect("/");

  // FETCH COURSE DATA
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
    },
  });

  // FETCH CAtegories
  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  // IF COURSE NOT FOUND, REDIRECT TO HOME
  if (!course) redirect("/");

  // REQUIRED FIELDS
  const requiredFields = [
    course.title,
    course.description,
    course.image,
    course.price,
    course.categoryId,
  ];

  // TOTAL FIELDS
  const totalFields = requiredFields.length;

  // COMPLETED FIELDS
  const completedFields = requiredFields.filter(Boolean).length;

  // TOTAL COMPLETED FIELDS
  const totalCompletedFields = `${completedFields}/${totalFields}`;

  return (
    <main className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-600">
            Complete all fields {totalCompletedFields}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          {/* TITLE FORM */}
          <TitleForm initialData={course} />
          {/* DESCRIPTION FORM */}
          <DescriptionForm initialData={course} />
          {/* IMAGE FORM */}
          <ImageForm initialData={course}/>
          {/* CATEGORY FORM */}
          <CategoryForm initialData={course} options={
            categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))
          } />
        </div>
      </div>
    </main>
  );
}
