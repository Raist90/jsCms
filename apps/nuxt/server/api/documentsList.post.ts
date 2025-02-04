import { db } from "~/db/db";
import { contentTable } from "~/db/dbSchema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const { documentName } = await readBody<{ documentName: string }>(event);

  const documentListByName = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.type, `${documentName}`));

  if (!documentListByName.length) return [];
  else return documentListByName;
});
