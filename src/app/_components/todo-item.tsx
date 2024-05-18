"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { deleteTodo, updateTodo } from "../_actions/todos";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { SelectTodo } from "@/server/db/schema";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { TrashIcon } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

const formSchema = z.object({
  desc: z.string(),
  isCompleted: z.boolean(),
});

type Form = z.infer<typeof formSchema>;

export function TodoItem({ todo }: { todo: SelectTodo }) {
  const { toast } = useToast();

  const form = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      desc: todo.desc,
      isCompleted: todo.isCompleted,
    },
  });

  const { watch } = form;

  async function onSubmit(data: Form, e: any) {
    console.log("Target: ", e.target);
    console.log("On Submit: ", data);
    if (todo.desc !== data.desc) {
      await updateTodo({
        id: todo.id,
        desc: data.desc,
      });

      toast({
        title: "Success",
        description: "Todo updated succesfully!",
      });
    }
  }

  const { mutate: mutate_update_todo } = useMutation({
    mutationFn: deleteTodo,
  });

  const { mutate: mutate_delete_todo } = useMutation({
    mutationFn: deleteTodo,
  });

  useEffect(() => {
    const subs = watch(({ isCompleted }) => {
      console.log("Watch1: ", isCompleted);
      if (isCompleted) {
        console.log("Watch2: ", isCompleted);
        mutate_update_todo(todo.id);
      }
    });

    return () => subs.unsubscribe();
  }, [watch]);

  return (
    <Form key={todo.id} {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl items-center gap-4 rounded-md bg-white/10 px-6 py-4 text-black"
      >
        <FormField
          name="isCompleted"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-md border-2 border-white/50 p-3"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          name="desc"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="text"
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    className="rounded-md border-none bg-transparent font-bold text-white focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button
          variant="ghost"
          className="p-0"
          onClick={() =>
            mutate_delete_todo(todo.id, {
              onSuccess: () => {
                toast({
                  title: "Success",
                  description: "Todo deleted succesfully!",
                });
              },
            })
          }
        >
          <TrashIcon
            className="aspect-square text-[hsl(280,35%,49%)]"
            fill="rgb(255 255 255 / 0.1)"
          />
        </Button>
      </form>
    </Form>
  );
}
