import type { Schema } from "~/types";
import { schemaTable } from "~/db/dbSchema";
import { db } from "~/db/db";
import { sql } from "drizzle-orm";
import assert from "assert";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ schema: Schema }>(event);
  const schema = body.schema;

  const id = crypto.randomUUID();
  const addSchemaQuery = async () => {
    return db
      .insert(schemaTable)
      .values({ id, schema, timestamp: sql`current_timestamp` });
  };

  const hasSchema = await db.$count(schemaTable);
  if (hasSchema > 0) {
    const { schema: prevSchema } = (await db.select().from(schemaTable))[0];
    try {
      assert.deepStrictEqual(prevSchema, schema);
      console.info("Schema matches");
    } catch (error) {
      if (import.meta.dev) console.info(error, "creating a new schema");

      await db.delete(schemaTable);
      await addSchemaQuery();
    }
  } else {
    await addSchemaQuery();
  }

  return {
    response: "Schema correctly setup",
  };
});
