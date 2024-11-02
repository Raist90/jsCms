import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const articleTable = sqliteTable("article", {
  id: text().primaryKey().notNull().unique(),
  type: text().notNull(),
  title: text().notNull(),
  slug: text().notNull(),
});

export const pageTable = sqliteTable("page", {
  id: text().primaryKey().notNull().unique(),
  type: text().notNull(),
  title: text().notNull(),
  slug: text().notNull(),
});
