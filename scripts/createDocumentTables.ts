import fs from "fs";
import path from "path";
import config from "@/cmsConfig";

const documents = config.schema.documents;
const tablesCode = documents
  .map((document) => {
    const fieldsCode = document.fields
      .map((field) => `${field.name}: text().notNull()`)
      .join();

    return `
      export const ${document.name}Table = sqliteTable("${document.name}", {
        id: text().primaryKey().notNull().unique(),
        type: text().notNull(),
        ${fieldsCode}
      });
`;
  })
  .join("\n");

const finalCode = `
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

${tablesCode}
`;

fs.writeFileSync(
  path.resolve(process.cwd(), "db/documentTables.ts"),
  finalCode,
);
