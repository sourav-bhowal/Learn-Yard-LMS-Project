"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { createNewCourseTitleSchema } from "@/validations/new-course";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editTitle } from "./actions";
import { useRouter } from "next/navigation";

// INTERFACE FOR TITLE FORM
interface TitleFormProps {
  initialData: {
    title: string;
    id: string;
  };
}

// TITLE FORM COMPONENT
export default function TitleForm({ initialData }: TitleFormProps) {
  // EDITTING STATE
  const [isEditting, setIsEditting] = useState(false);

  // TOAST
  const { toast } = useToast();

  // ROUTER
  const router = useRouter();

  // FORM
  const form = useForm<z.infer<typeof createNewCourseTitleSchema>>({
    resolver: zodResolver(createNewCourseTitleSchema),
    defaultValues: initialData,
  });

  // SUBMIT STATE
  const { isSubmitting, isValid } = form.formState;

  // SUBMIT FUNCTION
  async function onSubmit(
    inputValues: z.infer<typeof createNewCourseTitleSchema>
  ) {
    // SEND REQ TO EDIT TITLE
    const response = await editTitle(inputValues, initialData.id);
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
        description: "Course title updated successfully",
      });
      setIsEditting(false);
      router.refresh();
    }
  }

  // RETURN TITLE FORM
  return (
    <div className="mt-6 border bg-slate-300 dark:bg-primary/10 p-4 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Course Title
        <Button
          variant={"ghost"}
          disabled={isSubmitting}
          onClick={() => setIsEditting(!isEditting)}
        >
          {isEditting ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="w-4 h-4 mr-2" />
              Edit Title
            </>
          )}
        </Button>
      </div>
      {/* FORM EDIT */}
      {!isEditting ? (
        <p className="text-sm mt-2">{initialData.title}</p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      {...field}
                      className="bg-slate-100 dark:bg-primary/10"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button type="submit" disabled={isSubmitting || !isValid}>
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
