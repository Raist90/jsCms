import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const schemaTable = sqliteTable("schema", {
  id: text().primaryKey().notNull().unique(),
  schema: text().notNull(),
});
