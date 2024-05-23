import "server-only";

import {
  type SelectTodo,
  type InsertTodo,
  todosTable,
} from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { asc, eq } from "drizzle-orm";
import { db } from "@/server/db";

export async function getTodo(id: number) {
  const [todo] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, id));
  return todo;
}

export async function getTodos(userId: string) {
  const todos = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.userId, userId))
    .orderBy(asc(todosTable.id));

  return todos;
}

export async function createTodo({
  desc,
  userId,
}: Omit<InsertTodo, "id" | "createdAt" | "updatedAt" | "isCompleted">) {
  const [addedTodo] = await db
    .insert(todosTable)
    .values({
      desc,
      userId,
    })
    .returning();

  console.log("AddedTodo: ", addedTodo);

  revalidatePath("/");
}

export async function updateTodo({
  id,
  updatedFields,
}: {
  id: number;
  updatedFields: Omit<
    Partial<SelectTodo>,
    "id" | "createdAt" | "updatedAt" | "userId"
  >;
}) {
  const [updatedTodo] = await db
    .update(todosTable)
    .set(updatedFields)
    .where(eq(todosTable.id, id))
    .returning();

  console.log("UpdateTodo: ", updatedTodo);
}

export async function deleteTodo(id: number) {
  const [deletedTodo] = await db
    .delete(todosTable)
    .where(eq(todosTable.id, id))
    .returning();

  console.log("DeletedTodo: ", deletedTodo);

  revalidatePath("/");
}
