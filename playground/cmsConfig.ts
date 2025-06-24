import type { AppConfig } from "nexus/types";
import * as allDocuments from "./documents";

export default {
  absoluteDBPath: "schema.db",
  schema: {
    documents: Object.values(allDocuments),
  },
} satisfies AppConfig;
