import * as z from "zod";

// NEW COURSE TITLE VALIDATION
export const createNewCourseTitleSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "Course Title is required" })
    .max(50, { message: "Course Title is too long" }),
});

// NEW COURSE DESCRIPTION VALIDATION
export const createNewCourseDescriptionSchema = z.object({
  description: z
    .string()
    .min(1, { message: "Course Description is required" })
    .max(500, { message: "Course Description is too long" }),
});

// NEW COURSE DESCRIPTION VALIDATION
export const createNewCourseImageSchema = z.object({
  image: z
    .string()
    .min(1, { message: "Course Image is required" })
    .max(500, { message: "Course Image is too long" }),
});

// NEW COURSE CATEGORY VALIDATION
export const createNewCourseCategorySchema = z.object({
  categoryId: z
    .string()
    .min(1, { message: "Course Category is required" })
    .max(50, { message: "Course Category is too long" }),
})