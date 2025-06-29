import { eq } from "drizzle-orm";

import { db } from "../db/db";
import { contentTable } from "../db/dbSchema";
import type { ComputeRange, DocumentDefinition, DocumentEntry } from "../types";

export { addDocument };

function addDocument(document: DocumentDefinition): DocumentDefinition {
  return document;
}

type FetchOptions = {
  documentName: DocumentDefinition["name"];
  limit?: ComputeRange<21>[number];
  formatter?: (data: any) => Partial<typeof data> | undefined;
};
async function fetch(
  options: FetchOptions,
): Promise<{ result?: DocumentEntry | DocumentEntry[] }> {
  const data = await db
    .select()
    .from(contentTable)
    .where(eq(contentTable.type, options.documentName))
    .limit(options.limit ?? -1);

  // TODO: not super-sure about this condition, it needs more tinkering
  if (options.limit === 1) return { result: data?.[0] };
  else return { result: data?.length ? data : undefined };
}

export const cmsClient = {
  fetch,
};
