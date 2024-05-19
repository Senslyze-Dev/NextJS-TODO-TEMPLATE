import "server-only";

import { type SelectTodo, todosTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/server/db";

export async function getTodos() {
  const todos = await db.select().from(todosTable).orderBy(asc(todosTable.id));
  return todos;
}

export async function createTodo(desc: string) {
  const [addedTodo] = await db.insert(todosTable).values({
    desc,
  });

  console.log("AddedTodo: ", addedTodo);

  return addedTodo;

  revalidatePath("/");
}

export async function updateTodo({
  id,
  desc,
}: Omit<SelectTodo, "createdAt" | "updatedAt" | "isCompleted">) {
  const updatedTodo = await db
    .update(todosTable)
    .set({ desc })
    .where(eq(todosTable.id, id))
    .returning();

  console.log("UpdateTodo: ", updatedTodo);
}

export async function deleteTodo(id: number) {
  const deletedTodo = await db
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning();

  console.log("DeletedTodo: ", deletedTodo);

  revalidatePath("/");
}
