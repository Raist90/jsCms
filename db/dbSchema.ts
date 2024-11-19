import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { DocumentJsonModel, Schema } from "~/types";

export const schemaTable = sqliteTable("schema", {
  id: text().primaryKey().notNull().unique(),
  schema: text("schema", { mode: "json" }).$type<Schema>().notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});

export const contentTable = sqliteTable("api", {
  id: text("id", { mode: "json" })
    .$type<DocumentJsonModel["id"]>()
    .primaryKey()
    .notNull()
    .unique(),
  type: text("type", { mode: "json" })
    .$type<DocumentJsonModel["type"]>()
    .notNull(),
  data: text("data", { mode: "json" })
    .$type<DocumentJsonModel["data"]>()
    .notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
