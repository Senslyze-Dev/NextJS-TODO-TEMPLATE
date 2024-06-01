"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { type BaseSyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTodoAction } from "./actions";
import { todoSchema } from "./validations";
import { useForm } from "react-hook-form";
import { type z } from "zod";

type Form = z.infer<typeof todoSchema>;

export function FormInput() {
  const { toast } = useToast();

  const form = useForm<Form>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      id: 0,
      desc: "",
      isCompleted: false,
    },
  });

  const { mutate: mutate_create_todo, isPending: is_pending_create_todo } =
    useMutation({
      mutationFn: createTodoAction,
    });

  async function onSubmit(data: Form, e?: BaseSyntheticEvent) {
    form.reset();
    mutate_create_todo(
      { desc: data.desc },
      {
        onSettled(data) {
          if (data?.serverError) {
            toast({
              title: "Error",
              description: data?.serverError,
            });
          } else if (data?.validationErrors) {
            toast({
              title: "Error",
              description: "Invalid data!",
            });
          } else {
            toast({
              title: "Success",
              description: "Todo created successfully!",
            });
          }
        },
      },
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-xl items-center gap-4 rounded-md"
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
                    disabled={is_pending_create_todo}
                    onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === "Enter") {
                        e.currentTarget.blur();
                      }
                    }}
                    className="rounded-md font-bold text-black focus-visible:ring-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="absolute mt-1" />
              </FormItem>
            );
          }}
        />

        <Button
          type="submit"
          className="rounded-md bg-white font-bold text-black hover:bg-white"
          disabled={is_pending_create_todo}
        >
          Add
        </Button>
      </form>
    </Form>
  );
}
