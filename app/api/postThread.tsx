"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { auth, useOrganization } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createThread } from "@/lib/actions/threads.action";
import { text } from "stream/consumers";

const ThreadValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
  accountId: z.string(),
});

const CommentValidation = z.object({
  thread: z.string().nonempty().min(3, { message: "Minimum 3 characters." }),
});

function PostThread({ userid }: { userid: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const { organization } = useOrganization();

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userid,
    },
  });

  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    console.log(`textthreads coming`);

    console.log(`textthreads ${values.thread} ${userid}`);
    await createThread({
      text: values.thread,
      author: userid,
      communityId: null,
      path: pathname,
    });
    // await createThread({
    //   text: values.thread,
    //   author: userId,
    //   communityId: organization ? organization.id : null,
    //   path: pathname,
    // });

    router.push("/");
  };

  return (
    <Form {...form}>
      {/* <form action="/api/form" method="post">
          <label htmlFor="first">First name:</label>
          <input type="text" id="first" name="first" />
          <label htmlFor="last">Last name:</label>
          <input type="text" id="last" name="last" />
          <button type="submit" onSubmit={form.handleSubmit(onSubmit)}>Submit</button>
        </form> */}
      <form
        className="mt-10 flex flex-col justify-start gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                Content
              </FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}

export default PostThread;
