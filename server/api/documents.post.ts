import { db } from "~/db/db";
import type { Document, DocumentJsonModel } from "~/types";
import * as allDocumentTables from "@/db/documentTables";
import { getTableUniqueName } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ document: Document; data: DocumentJsonModel }>(
    event,
  );

  const documentTables = Object.values(allDocumentTables);
  const documentTableIdx = documentTables
    .map((table) => getTableUniqueName(table))
    .findIndex((name) => name === `public.${body.document.name}`);
  const documentTable = documentTables[documentTableIdx];

  await db
    .insert(documentTable)
    .values({ ...body.data } as typeof documentTable.$inferSelect);
  console.log("data correctly added");
});
