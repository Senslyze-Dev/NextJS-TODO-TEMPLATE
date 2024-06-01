// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator(
  (name) => `todo-base-template_${name}`,
);

export const usersTable = createTable("user", {
  id: varchar("id", { length: 256 }).primaryKey(),
  email: varchar("email", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: varchar("createdAt", { length: 256 }).notNull(),
});

export const todosTable = createTable("todo", {
  id: serial("id").primaryKey(),
  desc: varchar("name", { length: 256 }).notNull(),
  isCompleted: boolean("isCompleted").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date())
    .notNull(),
  userId: varchar("userId")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const usersRelation = relations(usersTable, ({ many }) => ({
  todos: many(todosTable),
}));

export const todosRelation = relations(todosTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [todosTable.userId],
    references: [usersTable.id],
  }),
}));

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertTodo = typeof todosTable.$inferInsert;
export type SelectTodo = typeof todosTable.$inferSelect;
