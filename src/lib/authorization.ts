import { getTodo } from "@/data-access/todos";

export async function getAuthorizedTodo(userId: string, todoId: number) {
  const todo = await getTodo(todoId);

  if (!todo) {
    return null;
  }

  if (todo.userId !== userId) {
    return null;
  }

  return todo;
}
