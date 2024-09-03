"use server";
import { prisma } from "@/lib/prismaDB";
import {
  createNewCourseDescriptionSchema,
  createNewCourseTitleSchema,
} from "@/validations/new-course";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";

// EDIT TITLE ACTIONS
export async function editTitle(
  inputValues: {
    title: string;
  },
  courseId: string
): Promise<{ error: string } | { course: Course }> {
  try {
    // GET USER ID
    const { userId } = auth();

    // IF USER ID NOT EXISTS
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // VALIDATE POST VALUES
    const { title } = createNewCourseTitleSchema.parse(inputValues);

    // FIND COURSE
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    // IF COURSE NOT FOUND
    if (!course) {
      return { error: "Course not found" };
    }

    // UPDATE COURSE IF USER ID MATCHES
    if (course.userId === userId) {
      const updatedCourse = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          title,
        },
      });
      // RETURN SUCCESS
      return { course: updatedCourse };
    }
    // RETURN ERROR IF USER ID DOES NOT MATCH
    else {
      return { error: "Unauthorized" };
    }
  } catch (error) {
    // IF ERROR
    console.log("[ERROR] createNewCourse: ", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}

// EDIT Description ACTIONS
export async function editDescription(
  inputValues: {
    description: string;
  },
  courseId: string
): Promise<{ error: string } | { course: Course }> {
  try {
    // GET USER ID
    const { userId } = auth();

    // IF USER ID NOT EXISTS
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // VALIDATE POST VALUES
    const { description } = createNewCourseDescriptionSchema.parse(inputValues);

    // FIND COURSE
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    // IF COURSE NOT FOUND
    if (!course) {
      return { error: "Course not found" };
    }

    // UPDATE COURSE IF USER ID MATCHES
    if (course.userId === userId) {
      const updatedCourse = await prisma.course.update({
        where: {
          id: courseId,
        },
        data: {
          description,
        },
      });
      // RETURN SUCCESS
      return { course: updatedCourse };
    }
    // RETURN ERROR IF USER ID DOES NOT MATCH
    else {
      return { error: "Unauthorized" };
    }
  } catch (error) {
    // IF ERROR
    console.log("[ERROR] createNewCourse: ", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
}
