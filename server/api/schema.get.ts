import { db } from "~/db/db";
import { schemaTable } from "~/db/dbSchema";

export default defineEventHandler(async () => {
  const { schema } = (await db.select().from(schemaTable))[0];
  return schema;
});
