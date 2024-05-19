"use server";

import {
  createTodoUseCase,
  getTodosUseCase,
  updateTodoDescUseCase,
  deleteTodoUseCase,
} from "@/use-cases/todos";
import { todoSchema } from "./validations";
import { revalidatePath } from "next/cache";
import { type z } from "zod";

export async function createTodoAction(data: z.infer<typeof todoSchema>) {
  // do auth

  const newTodo = todoSchema.parse(data);

  await createTodoUseCase(newTodo.desc);

  revalidatePath("/");
}

export async function getTodosAction() {
  // do auth

  return await getTodosUseCase();
}

export async function updateTodoDescAction({
  id,
  desc,
}: {
  id: number;
  desc: string;
}) {
  // do auth

  await updateTodoDescUseCase(id, desc);

  revalidatePath("/");
}

export async function deleteTodoAction(id: number) {
  // do auth

  await deleteTodoUseCase(id);

  revalidatePath("/");
}
