import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// UPLOAD THING SETUP
const f = createUploadthing();

// AUTH FUNCTION
const handleAuth = () => {
  const { userId } = auth();
  if (!userId) throw new Error("Unauthorized");

  return { userId };
};

// FILE ROUTER
export const ourFileRouter = {
  // COURSE IMAGE UPLOAD ROUTE
  courseImage: f({
    image: {
      maxFileSize: "16MB",
      maxFileCount: 1,
    },
  })
    // RUN AUTH
    .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {
      // DO SOMETHING
      console.log("Upload complete");
    }),

  // COURSE ATTACHMENT UPLOAD ROUTE
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    // RUN AUTH
    .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {}),

  // CHAPTER VIDEO UPLOAD ROUTE
  chapterVideo: f({
    video: {
      maxFileSize: "128MB",
      maxFileCount: 1,
    },
  })
    // RUN AUTH
    // .middleware(() => handleAuth())
    // ON SUCCESS
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
