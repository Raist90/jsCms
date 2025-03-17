import { sql } from "drizzle-orm";
import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";
import type { DocumentEntry } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<DocumentEntry>(event);

  await db
    .insert(contentTable)
    .values({
      ...body,
      timestamp: sql`current_timestamp`,
    })
    .onConflictDoUpdate({
      target: contentTable.id,
      set: {
        data: body.data,
      },
    });
});
