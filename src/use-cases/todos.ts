import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "@/data-access/todos";

export async function createTodoUseCase(desc: string) {
  // business logic

  const todo = await createTodo(desc);

  return todo;
}

export async function getTodosUseCase() {
  // business logic

  const todos = await getTodos();

  return todos;
}

export async function updateTodoDescUseCase(id: number, desc: string) {
  // business logic

  const todo = await updateTodo({ id, desc });

  return todo;
}

export async function deleteTodoUseCase(id: number) {
  // business logic

  const todo = await deleteTodo(id);

  return todo;
}
