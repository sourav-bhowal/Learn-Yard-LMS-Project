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
import { editDescription, editPrice } from "./actions";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { createNewCourseDescriptionSchema, createNewCoursePriceSchema } from "@/validations/new-course";
import { Input } from "@/components/ui/input";

// INTERFACE FOR TITLE FORM
interface PriceFormProps {
  initialData: {
    id: string;
    price: number | null;
  };
}

// TITLE FORM COMPONENT
export default function PriceForm({ initialData }: PriceFormProps) {
  // EDITTING STATE
  const [isEditting, setIsEditting] = useState(false);

  // TOAST
  const { toast } = useToast();

  // ROUTER
  const router = useRouter();

  // FORM
  const form = useForm<z.infer<typeof createNewCoursePriceSchema>>({
    resolver: zodResolver(createNewCoursePriceSchema),
    defaultValues: {
      price: initialData.price || 0,
    },
  });

  // SUBMIT STATE
  const { isSubmitting, isValid } = form.formState;

  // SUBMIT FUNCTION
  async function onSubmit(
    inputValues: z.infer<typeof createNewCoursePriceSchema>
  ) {
    // SEND REQ TO EDIT TITLE
    const response = await editPrice(inputValues, initialData.id);
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
              Edit Price
            </>
          )}
        </Button>
      </div>
      {/* FORM EDIT */}
      {!isEditting ? (
        initialData.price ? (
          <p className="mt-4 text-sm">${initialData.price}</p>
        ) : (
          <p className="mt-4 text-sm text-slate-500">No price</p>
        )
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
          >
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="$0.00"
                      type="number"
                      step={0.01}
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