import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Document } from "~/types";

export function createDocumentTables(document: Document) {
  const fields = document.fields;

  const columns = fields
    .map((field) => ({
      [field.name]: text().notNull(),
    }))
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});

  return sqliteTable(document.name, {
    id: text().primaryKey().notNull().unique(),
    name: text().notNull(),
    type: text().notNull(),
    ...columns,
  });
}
