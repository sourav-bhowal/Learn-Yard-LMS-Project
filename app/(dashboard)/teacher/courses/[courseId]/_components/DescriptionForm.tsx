"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editDescription } from "./actions";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { createNewCourseDescriptionSchema } from "@/validations/new-course";

// INTERFACE FOR TITLE FORM
interface DescriptionFormProps {
  initialData: {
    id: string;
    description: string;
  };
}

// TITLE FORM COMPONENT
export default function DescriptionForm({ initialData }: DescriptionFormProps) {
  // EDITTING STATE
  const [isEditting, setIsEditting] = useState(false);

  // TOAST
  const { toast } = useToast();

  // ROUTER
  const router = useRouter();

  // FORM
  const form = useForm<z.infer<typeof createNewCourseDescriptionSchema>>({
    resolver: zodResolver(createNewCourseDescriptionSchema),
    defaultValues: initialData,
  });

  // SUBMIT STATE
  const { isSubmitting, isValid } = form.formState;

  // SUBMIT FUNCTION
  async function onSubmit(
    inputValues: z.infer<typeof createNewCourseDescriptionSchema>
  ) {
    // SEND REQ TO EDIT TITLE
    const response = await editDescription(inputValues, initialData.id);
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
        description: "Course description updated successfully",
      });
      setIsEditting(false);
      router.refresh();
    }
  }

  // RETURN TITLE FORM
  return (
    <div className="mt-6 border bg-slate-300 dark:bg-primary/10 p-4 rounded-md">
      <div className="font-medium flex items-center justify-between">
        Course Description
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
              Edit Description
            </>
          )}
        </Button>
      </div>
      {/* FORM EDIT */}
      {!isEditting ? (
        initialData.description ? (
          <p className="mt-4 text-sm">{initialData.description}</p>
        ) : (
          <p className="mt-4 text-sm text-slate-500">No description</p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="ex: Web Development"
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
