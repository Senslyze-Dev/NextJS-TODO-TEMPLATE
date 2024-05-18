import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TodoItem } from "./_components/todo-item";
import { addTodo, getTodos } from "./_actions/todos";

export default async function HomePage() {
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

        <div className="flex w-full flex-col items-center justify-center gap-4">
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
