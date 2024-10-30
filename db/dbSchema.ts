import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { Document } from "@/types";
import schema from "@/cmsConfig";

export const schemaTable = sqliteTable("schema", {
  id: text().primaryKey().notNull().unique(),
  schema: text().notNull(),
});

// TODO: sort out how to handle drafts. Maybe it can just be a field returned from data
// export const apiTable = sqliteTable("cmsApi", {
//   id: text().primaryKey().notNull().unique(),
//   data: text().notNull(),
// });

// TODO: follow this: https://github.com/drizzle-team/drizzle-orm/issues/1228
const documents = schema.schema.documents;
documents.forEach((document) => createDocumentTables(document));

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
