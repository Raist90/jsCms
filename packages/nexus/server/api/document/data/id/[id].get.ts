import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";
import { isValidUUID } from "~/predicates";

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      id: z.string().refine((id) => isValidUUID(id)),
    }).safeParse,
  );

  if (!params.success)
    throw createError({ statusCode: 500, message: "Invalid document id" });

  const { id: documentId } = params.data;
  const document = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.id, documentId));

  if (!document.length)
    throw createError({ statusCode: 404, message: "Document not found" });

  return document[0];
});
