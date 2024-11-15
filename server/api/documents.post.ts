import { sql } from "drizzle-orm";
import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";
import type { DocumentJsonModel } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody<DocumentJsonModel>(event);

  await db.insert(contentTable).values({
    ...body,
    timestamp: sql`current_timestamp`,
  });
});
