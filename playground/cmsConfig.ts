import type { AppConfig } from "nexus/types";
import * as allDocuments from "./documents";

export default {
  schema: {
    documents: Object.values(allDocuments),
  },
} satisfies AppConfig;
