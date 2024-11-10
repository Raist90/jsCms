import { db } from "~/db/db";
import type { Document, DocumentJsonModel } from "~/types";
import { addDocumentTables } from "~/utils/addDocumentTables";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ document: Document; data: DocumentJsonModel }>(
    event,
  );

  const documentTable = addDocumentTables(body.document);
  await db.insert(documentTable).values(body.data);
});
