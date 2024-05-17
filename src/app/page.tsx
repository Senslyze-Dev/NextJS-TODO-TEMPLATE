import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/server/db";
import { todosTable } from "@/server/db/schema";
import { revalidatePath } from "next/cache";
import { TodoItem } from "./_components/todo-item";

export default async function HomePage() {
  async function addTodo(formData: FormData) {
    "use server";

    const desc = formData.get("desc") as string;

    const addedTodo = await db.insert(todosTable).values({
      desc,
    });

    console.log("AddedTodo: ", addedTodo);

    revalidatePath("/");
  }

  async function getTodos() {
    "use server";

    const todos = await db.select().from(todosTable);
    return todos;
  }

  const todos = await getTodos();

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          T3 <span className="text-[hsl(280,100%,70%)]">Todo</span> App
        </h1>

        <form className="flex w-full max-w-md gap-4" action={addTodo}>
          <Input
            name="desc"
            className="rounded-md font-bold text-black focus-visible:ring-0"
            placeholder="What needs to be done?"
          />
          <span className="dark">
            <Button className="rounded-md font-bold">Add</Button>
          </span>
        </form>

        {todos.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </div>
    </main>
  );
}
