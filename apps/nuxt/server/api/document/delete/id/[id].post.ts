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

  await db.delete(contentTable).where(eq(contentTable.id, params.data.id));
});
