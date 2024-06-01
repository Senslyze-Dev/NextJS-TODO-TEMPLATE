import { TodoItem } from "./_components/todo-item";
import { getTodosAction } from "./_components/actions";
import { FormInput } from "./_components/form-input";
import { type SelectTodo } from "@/server/db/schema";
import { cn } from "@/lib/utils";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

function Todos({
  todos,
  className,
}: {
  todos: SelectTodo[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-[70vh] w-full flex-col items-center gap-4 overflow-y-auto",
        className,
      )}
    >
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </div>
  );
}

export default async function HomePage() {
  const { data } = await getTodosAction({});

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] pt-4 text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          T3 <span className="text-[hsl(280,100%,70%)]">Todo</span> App
        </h1>

        <FormInput />

        {data?.todos ? <Todos todos={data.todos} /> : <></>}
      </div>

      <Button className="text-md absolute right-[3%] top-[4%] bg-transparent p-6 font-semibold">
        <SignOutButton>Sign Out</SignOutButton>
      </Button>
    </main>
  );
}
