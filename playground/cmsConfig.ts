import type { AppConfig } from "nuxt-app/types";
import * as allDocuments from "./documents";

export default {
  schema: {
    documents: Object.values(allDocuments).filter(
      (doc) => doc.name === "article",
    ),
  },
} satisfies AppConfig;
