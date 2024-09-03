"use client";
import { createNewCourseTitleSchema } from "@/validations/new-course";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createNewCourse } from "./actions";
import { Loader2 } from "lucide-react";

// CREATE NEW COURSE PAGE
export default function CreateNewCoursePage() {
  // USE TRANSITION HOOK
  const [isPending, startTransition] = useTransition();

  // ROUTER
  const router = useRouter();

  // TOAST
  const { toast } = useToast();

  // CREATE NEW COURSE FORM
  const form = useForm<z.infer<typeof createNewCourseTitleSchema>>({
    resolver: zodResolver(createNewCourseTitleSchema),
    defaultValues: {
      title: "",
    },
  });

  // SUBMIT FUNCTION
  const onSubmit = (inputValues: z.infer<typeof createNewCourseTitleSchema>) => {
    // start transition
    startTransition(async () => {
      // SEND POST REQUEST TO CREATE NEW COURSE
      const response = await createNewCourse(inputValues);
      // IF ERROR
      if ("error" in response) {
        toast({
          description: response.error,
          title: "Error",
          variant: "destructive",
        });
      }
      // IF SUCCESS
      else {
        toast({
          description: "Course created successfully",
          variant: "default",
        });
        router.push(`/teacher/courses/${response?.course?.id}`);
      }
    });
  };

  // RETURN JSX
  return (
    <main className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name your Course</h1>
        <p className="text-sm text-slate-600">
          What will your course be called? Don&apos;t worry, you can change it
          later
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course title"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormDescription>
                    What will your course be called?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/teacher/courses">
                <Button disabled={isPending} variant={"outline"} type="button">
                  Cancel
                </Button>
              </Link>
              <Button
                disabled={isPending || !form.formState.isValid}
                type="submit"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Create"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
