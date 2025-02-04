import type { Schema } from "@/types";
import * as allDocuments from "./documents";

export { schema };

const documents = Object.values(allDocuments);

const schema: Schema = {
  documents,
};
