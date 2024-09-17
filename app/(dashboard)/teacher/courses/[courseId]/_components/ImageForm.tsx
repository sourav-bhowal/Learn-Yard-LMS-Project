"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createNewCourseImageSchema } from "@/validations/new-course";
import Image from "next/image";
import FileUploader from "@/components/shared/FileUploader";
import { editImage } from "./actions";

// INTERFACE FOR TITLE FORM
interface ImageFormProps {
  initialData: {
    id: string;
    image: string | null;
  };
}

// TITLE FORM COMPONENT
export default function ImageForm({ initialData }: ImageFormProps) {
  // EDITTING STATE
  const [isEditting, setIsEditting] = useState(false);

  // TOAST
  const { toast } = useToast();

  // ROUTER
  const router = useRouter();

  // SUBMIT
  async function onSubmit(
    inputValues: z.infer<typeof createNewCourseImageSchema>
  ) {
    // SEND REQ TO EDIT TITLE
    const response = await editImage(inputValues, initialData.id);
    // IF ERROR
    if ("error" in response) {
      toast({
        description: response.error,
        variant: "destructive",
      });
      setIsEditting(false);
    }
    // IF SUCCESS
    else {
      toast({
        description: "Course image updated successfully",
      });
      setIsEditting(false);
      router.refresh();
    }
  }

  // RETURN TITLE FORM
  return (
    <div className="mt-6 border bg-slate-300 dark:bg-primary/10 p-4 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Course Image
        <Button variant={"ghost"} onClick={() => setIsEditting(!isEditting)}>
          {isEditting ? (
            <>Cancel</>
          ) : (
            <>
              {!isEditting ? (
                <>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add an image
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit image
                </>
              )}
            </>
          )}
        </Button>
      </div>
      {/* FORM EDIT */}
      {!isEditting ? (
        initialData.image ? (
          <div className="relative aspect-video mt-2">
            <Image
              src={initialData.image}
              alt="Course Image"
              fill
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-100 dark:bg-primary/10 rounded-md mt-2">
            <ImageIcon className="w-10 h-10 text-slate-400" />
          </div>
        )
      ) : (
        <div>
          <FileUploader
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({
                  image: url,
                });
                console.log(url);
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
