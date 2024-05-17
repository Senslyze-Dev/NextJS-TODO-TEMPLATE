"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { SelectTodo } from "@/server/db/schema";
import { TrashIcon } from "lucide-react";

export function TodoItem({ todo }: { todo: SelectTodo }) {
  return (
    <div
      key={todo.id}
      className="flex w-full max-w-xl items-center gap-4 rounded-md bg-white/10 px-6 py-4 text-black"
    >
      <Checkbox className="rounded-md border-2 border-white/50 p-3" />
      <Input
        name="desc"
        value={todo.desc}
        className="rounded-md border-none bg-transparent font-bold text-white focus-visible:ring-0"
        placeholder="What needs to be done?"
      />

      <Button variant={"ghost"} className="p-0">
        <TrashIcon
          className="aspect-square text-[hsl(280,35%,49%)]"
          fill="rgb(255 255 255 / 0.1)"
        />
      </Button>
    </div>
  );
}
