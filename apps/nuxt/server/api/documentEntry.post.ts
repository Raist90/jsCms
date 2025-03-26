import { eq } from "drizzle-orm";
import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";
import type { Prettify } from "~/types";
import type { cmsClient } from "~/utils/cmsClient";

export default defineEventHandler(async (event) => {
  const body =
    await readBody<
      Prettify<Omit<Parameters<(typeof cmsClient)["fetch"]>[0], "formatter">>
    >(event);

  const data = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.type, body.documentName))
    .limit(body.limit ?? -1);

  return {
    result: data.map((d) => d.data),
  };
});
