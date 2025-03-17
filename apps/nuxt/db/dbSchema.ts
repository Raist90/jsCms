import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { DocumentEntry } from "~/types";

export const contentTable = sqliteTable("api", {
  id: text("id", { mode: "json" })
    .$type<DocumentEntry["id"]>()
    .primaryKey()
    .notNull()
    .unique(),
  type: text("type", { mode: "json" }).$type<DocumentEntry["type"]>().notNull(),
  data: text("data", { mode: "json" }).$type<DocumentEntry["data"]>().notNull(),
  timestamp: text("timestamp")
    .notNull()
    .default(sql`(current_timestamp)`),
});
