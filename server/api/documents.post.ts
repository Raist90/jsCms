import { db } from "~/db/db";
import type { Document, DocumentJsonModel } from "~/types";
import { createDocumentTables } from "~/utils/createDocumentTables";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ document: Document; data: DocumentJsonModel }>(
    event,
  );

  const documentTable = createDocumentTables(body.document);
  await db.insert(documentTable).values(body.data);
  console.log("data correctly added");
});
