import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

// UPLOAD THING SETUP
const uploadThing = createUploadthing();

// AUTH FUNCTION
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

// FILE ROUTER
export const ourFileRouter = {
  // COURSE IMAGE UPLOAD ROUTE
  courseImage: uploadThing({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    // RUN AUTH
    .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {}),

  // COURSE ATTACHMENT UPLOAD ROUTE
  courseAttachment: uploadThing(["text", "image", "video", "audio", "pdf"])
    // RUN AUTH
    .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {}),

  // CHAPTER VIDEO UPLOAD ROUTE
  chapterVideo: uploadThing({
    video: {
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    // RUN AUTH
    .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
