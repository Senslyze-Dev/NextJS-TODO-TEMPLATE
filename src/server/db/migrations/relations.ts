import { relations } from "drizzle-orm/relations";
import { todo-base-template_user, todo-base-template_todo } from "./schema";

export const todo-base-template_todoRelations = relations(todo-base-template_todo, ({one}) => ({
	todo-base-template_user: one(todo-base-template_user, {
		fields: [todo-base-template_todo.userId],
		references: [todo-base-template_user.id]
	}),
}));

export const todo-base-template_userRelations = relations(todo-base-template_user, ({many}) => ({
	todo-base-template_todos: many(todo-base-template_todo),
}));