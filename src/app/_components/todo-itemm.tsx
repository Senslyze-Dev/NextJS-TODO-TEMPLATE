"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SelectTodo } from "@/server/db/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  desc: z.string(),
  isCompleted: z.boolean(),
});

type Form = z.infer<typeof formSchema>;

export function TodoItemm({ todo }: { todo: SelectTodo }) {
  console.log("rendered")
  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: todo.desc,
      isCompleted: todo.isCompleted,
    },
  });

  function onSubmit(data: Form) {
    console.log("On Submit: ", data);
  }

  return (
    <Form key={todo.id} {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl items-center gap-4 rounded-md bg-white/10 px-6 py-4 text-black"
      >
        <FormField
          name="desc"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    className="rounded-md border-none bg-transparent font-bold text-white focus-visible:ring-0"
                    value={field.value}
                    onChange={field.onChange}
                    onKeyUp={async (e) => {
                      if (e.key === "Enter") {
                        await form.handleSubmit(onSubmit)();
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button variant={"ghost"} className="p-0">
          <TrashIcon
            className="aspect-square text-[hsl(280,35%,49%)]"
            fill="rgb(255 255 255 / 0.1)"
          />
        </Button>
        {/* <DevTool control={form.control} /> */}
      </form>
    </Form>
  );
}
