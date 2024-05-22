"use server";

import {
  createTodoUseCase,
  getTodosUseCase,
  updateTodoDescUseCase,
  deleteTodoUseCase,
} from "@/use-cases/todos";
import { authenticatedAction } from "@/lib/safe-action";
import { todoSchema } from "./validations";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createTodoAction = authenticatedAction(
  todoSchema.omit({
    id: true,
    isCompleted: true,
  }),
  async ({ desc }) => {
    await createTodoUseCase(desc);

    revalidatePath("/");
  },
);

export const getTodosAction = authenticatedAction(z.object({}), async () => {
  return await getTodosUseCase();
});

export const updateTodoDescAction = authenticatedAction(
  todoSchema.omit({
    isCompleted: true,
  }),
  async ({ id, desc }) => {
    await updateTodoDescUseCase(id, desc);

    revalidatePath("/");
  },
);

export const deleteTodoAction = authenticatedAction(
  todoSchema.omit({
    desc: true,
    isCompleted: true,
  }),
  async ({ id }) => {
    await deleteTodoUseCase(id);

    revalidatePath("/");
  },
);
