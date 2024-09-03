"use server";
import { prisma } from "@/lib/prismaDB";
import { createNewCourseTitleSchema } from "@/validations/new-course";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";

// CREATE NEW COURSE ACTIONS
export async function createNewCourse(inputValues: {
  title: string;
}): Promise<{ error: string } | { course: Course }> {
  try {
    // GET USER ID
    const { userId } = auth();

    // VALIDATE POST VALUES
    const { title } = createNewCourseTitleSchema.parse(inputValues);

    // IF USER ID NOT EXISTS
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // CREATE NEW COURSE
    const newCourse = await prisma.course.create({
      data: {
        title,
        userId,
      },
    });

    // IF NEW COURSE NOT EXISTS
    if (!newCourse) {
      return { error: "An unexpected error occurred. Please try again."};
    }

    // RETURN SUCCESS
    return { course: newCourse };
  } catch (error) {
    // IF ERROR
    console.log("[ERROR] createNewCourse: ", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
