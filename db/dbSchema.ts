import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const schemaTable = sqliteTable("schema", {
  id: text().primaryKey().notNull().unique(),
  schema: text().notNull(),
});

// TODO: sort out how to handle drafts. Maybe it can just be a field returned from data
export const apiTable = sqliteTable("cmsApi", {
  id: text().primaryKey().notNull().unique(),
  data: text().notNull(),
});
