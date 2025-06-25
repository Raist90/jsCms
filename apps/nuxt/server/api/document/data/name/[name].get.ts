import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";

export default defineEventHandler(async (event) => {
  const params = await getValidatedRouterParams(
    event,
    z.object({
      name: z.string(),
    }).safeParse,
  );

  if (!params.success)
    throw createError({ statusCode: 500, message: "Invalid document name" });

  const { name: documentName } = params.data;

  const documentListByName = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.type, documentName));

  if (!documentListByName.length) return [];
  else return documentListByName;
});
