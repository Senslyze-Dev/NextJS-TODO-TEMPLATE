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
import { getAuthorizedTodo } from "@/lib/authorization";

export const createTodoAction = authenticatedAction(
  todoSchema.omit({
    id: true,
    isCompleted: true,
  }),
  async ({ desc }, { userId }) => {
    await createTodoUseCase({ desc, userId });

    revalidatePath("/");
  },
);

export const getTodosAction = authenticatedAction(
  z.object({}),
  async (_, { userId }) => {
    const todos = await getTodosUseCase({ userId });
    return { todos };
  },
);

export const updateTodoDescAction = authenticatedAction(
  todoSchema.omit({
    isCompleted: true,
  }),
  async ({ id, desc }, { userId }) => {
    const authorizedTodo = await getAuthorizedTodo(userId, id);

    if (!authorizedTodo) {
      throw new Error("Unauthorized user!");
    }

    await updateTodoDescUseCase({
      id,
      desc,
    });

    revalidatePath("/");
  },
);

export const deleteTodoAction = authenticatedAction(
  todoSchema.omit({
    desc: true,
    isCompleted: true,
  }),
  async ({ id }, { userId }) => {
    const authorizedTodo = await getAuthorizedTodo(userId, id);

    if (!authorizedTodo) {
      throw new Error("Unauthorized user!");
    }

    await deleteTodoUseCase({ id });

    revalidatePath("/");
  },
);
