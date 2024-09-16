"use server";
import { prisma } from "@/lib/prismaDB";
import {
  createNewCourseCategorySchema,
  createNewCourseDescriptionSchema,
  createNewCourseImageSchema,
  createNewCourseTitleSchema,
} from "@/validations/new-course";
import { auth } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { UTApi } from "uploadthing/server";

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

// EDIT Description ACTIONS
export async function editImage(
  inputValues: {
    image: string;
  },
  courseId: string
): Promise<{ error: string } | {}> {
  try {
    // GET USER ID
    const { userId } = auth();

    // IF USER ID NOT EXISTS
    if (!userId) {
      return { error: "Unauthorized" };
    }

    // VALIDATE POST VALUES
    const { image } = createNewCourseImageSchema.parse(inputValues);

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
          image,
        },
      });
      if (!updatedCourse) {
        await new UTApi().deleteFiles([image]);
      }

      // RETURN SUCCESS
      return {};
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

// EDIT CATEGORY ACTIONS
// EDIT Description ACTIONS
export async function editCategory(
  inputValues: {
    categoryId: string;
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
    const {categoryId} = createNewCourseCategorySchema.parse(inputValues);

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
          categoryId,
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