import type { Schema } from "~/types";
import { schemaTable } from "~/db/dbSchema";
import { db } from "~/db/db";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ schema: Schema }>(event);
  const schema = JSON.stringify(body.schema);

  const id = crypto.randomUUID();
  const addSchemaQuery = async () => {
    return db.insert(schemaTable).values({ id, schema });
  };

  const hasSchema = await db.$count(schemaTable);
  if (!hasSchema) await addSchemaQuery();
});
