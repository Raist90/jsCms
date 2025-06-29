import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";

export default defineEventHandler(async () => {
  const documentsList = await db.select().from(contentTable);

  return documentsList;
});
