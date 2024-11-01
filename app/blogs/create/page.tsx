"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { TooltipDemo } from "@/components/TooltipComponent";

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(60, { message: "Title must be at most 60 characters." }),
  subtitle: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  content: z.string().min(2, {
    message: "Content must be at least 2 characters.",
  }),
});

export default function CreateBlog() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      subtitle: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    axios
      .post("/api/blog", values)
      .then((res) => {
        console.log(res);
        setIsSubmitting(false);
        form.reset();
        router.push("/blogs");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex justify-center items-center p-4">
      <Card className="w-full max-w-2xl mt-3">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Send className="w-6 h-6" />
            Create New Post
          </CardTitle>
          <CardDescription>
            Fill out the form below to create a new post. All fields are
            required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1 items-center">
                      <FormLabel className="mt-1">Title</FormLabel>
                      <TooltipDemo content="Tip: Add 50-60 characters for SEO optimization" />
                    </div>
                    <FormControl>
                      <Input placeholder="Enter the post title" {...field} />
                    </FormControl>
                    <FormDescription>
                      A catchy title for your post (2-60 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subtitle"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1 items-center">
                      <FormLabel className="mt-1">SubTitle</FormLabel>
                      <TooltipDemo content="Tip: Add 80-100 characters for SEO optimization" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Enter the post subordinate title"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      A catchy subtitle for your post (2-100 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex gap-1 items-center">
                      <FormLabel className="mt-1">Content</FormLabel>
                      <TooltipDemo content="Tip: Add minimum 400 characters for SEO optimization" />
                    </div>
                    <CKEditor
                      editor={ClassicEditor}
                      data={field.value}
                      onChange={(_, editor) => {
                        field.onChange(editor.getData());
                      }}
                    />
                    <FormDescription>
                      The main body of your post (10-1000 characters).
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Post
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
