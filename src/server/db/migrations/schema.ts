import { pgTable, foreignKey, serial, varchar, boolean, timestamp } from "drizzle-orm/pg-core"
  import { sql } from "drizzle-orm"



export const todo-base-template_todo = pgTable("todo-base-template_todo", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }).notNull(),
	isCompleted: boolean("isCompleted").default(false).notNull(),
	created_at: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updatedAt", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	userId: varchar("userId").notNull().references(() => todo-base-template_user.id, { onDelete: "cascade" } ),
});

export const todo-base-template_user = pgTable("todo-base-template_user", {
	id: varchar("id", { length: 256 }).primaryKey().notNull(),
	email: varchar("email", { length: 256 }).notNull(),
	password: varchar("password", { length: 256 }).notNull(),
	createdAt: varchar("createdAt", { length: 256 }).notNull(),
});