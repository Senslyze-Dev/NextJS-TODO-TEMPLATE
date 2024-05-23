import "server-only";

import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/data-access/todos";

export async function createTodoUseCase({
  desc,
  userId,
}: {
  desc: string;
  userId: string;
}) {
  // business logic

  const todo = await createTodo({ desc, userId });

  return todo;
}

export async function getTodosUseCase({ userId }: { userId: string}) {
  // business logic

  const todos = await getTodos(userId);

  return todos;
}

export async function updateTodoDescUseCase({
  id,
  desc,
}: {
  id: number;
  desc: string;
}) {
  // business logic

  const todo = await updateTodo({ id, updatedFields: { desc } });

  return todo;
}

export async function deleteTodoUseCase({ id }: { id: number }) {
  // business logic

  const todo = await deleteTodo(id);

  return todo;
}
