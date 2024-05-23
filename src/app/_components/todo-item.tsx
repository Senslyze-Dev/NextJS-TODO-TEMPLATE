"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { deleteTodoAction, updateTodoDescAction } from "./actions";
import { type BaseSyntheticEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SelectTodo } from "@/server/db/schema";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { XIcon } from "lucide-react";
import { z } from "zod";

const formSchema = z.object({
  desc: z.string().min(3, "Description must be at least 3 characters"),
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

  const {
    watch,
    formState: { errors },
  } = form;

  const { mutate: mutate_update_todo } = useMutation({
    mutationFn: updateTodoDescAction,
  });

  async function onSubmit(data: Form, e?: BaseSyntheticEvent) {
    console.log("Target: ", e?.target);
    console.log("On Submit: ", data);
    if (todo.desc !== data.desc) {
      mutate_update_todo({
        id: todo.id,
        desc: data.desc,
      });

      toast({
        title: "Success",
        description: "Todo updated succesfully!",
      });
    }
  }

  const { mutate: mutate_delete_todo } = useMutation({
    mutationFn: deleteTodoAction,
  });

  useEffect(() => {
    const subs = watch(({ isCompleted }) => {
      if (isCompleted) {
        mutate_delete_todo(
          { id: todo.id },
          {
            onSuccess: () =>
              toast({
                title: "Hurray!",
                description: "Todo completed!",
              }),
          },
        );
      }
    });

    return () => subs.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (errors.desc) {
      toast({
        title: "Error",
        description: errors.desc.message,
      });
    }
  }, [errors.desc]);

  console.log("TodoItem");

  return (
    <Form key={todo.id} {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl items-center gap-4 rounded-md bg-white/10  px-6 py-4 text-black"
      >
        <FormField
          name="isCompleted"
          control={form.control}
          render={({ field }) => {
            return (
              <FormItem className="flex items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="h-6 w-6 rounded-md border-2"
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
              <FormItem className="relative flex-1">
                <FormControl>
                  <>
                    <Input
                      type="text"
                      onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Enter") {
                          e.currentTarget.blur();
                        }
                      }}
                      className="rounded-md border-none bg-transparent font-bold text-white "
                      {...field}
                    />
                  </>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <Button
          type="button"
          variant="ghost"
          className="group p-0"
          onClick={() =>
            mutate_delete_todo(
              { id: todo.id },
              {
                onSuccess: () => {
                  toast({
                    title: "Success",
                    description: "Todo deleted succesfully!",
                  });
                },
              },
            )
          }
        >
          <XIcon className="w-10 text-[hsl(280,35%,49%)] group-hover:text-[hsl(280,80%,76%)]" />
        </Button>
      </form>
    </Form>
  );
}
