import { getTableUniqueName } from "drizzle-orm";
import * as allDocumentTables from "@/db/documentTables";
import { db } from "~/db/db";

export default defineEventHandler(async (event) => {
  const { documentName } = await readBody<{ documentName: string }>(event);

  const documentTables = Object.values(allDocumentTables);
  const documentTableIdx = documentTables
    .map((table) => getTableUniqueName(table))
    .findIndex((name) => name === `public.${documentName}`);
  const documentTable = documentTables[documentTableIdx];

  const list = await db.select().from(documentTable);
  return list;
});
