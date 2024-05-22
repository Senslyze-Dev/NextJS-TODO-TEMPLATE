import { TodoItem } from "./_components/todo-item";
import { getTodosAction } from "./_components/actions";
import { FormInput } from "./_components/form-input";
import { type SelectTodo } from "@/server/db/schema";
import { cn } from "@/lib/utils";

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
        "flex h-[50vh] w-full flex-col items-center gap-4 overflow-y-scroll",
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
  const { data: todos } = await getTodosAction({});

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          T3 <span className="text-[hsl(280,100%,70%)]">Todo</span> App
        </h1>

        <FormInput />

        {todos ? <Todos todos={todos} /> : <></>}
      </div>
    </main>
  );
}
