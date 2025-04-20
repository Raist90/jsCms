import type { AppConfig } from "./types";

export default {
  schema: {
    documents: [
      {
        name: "Page",
        title: "Page",
        description: "A page",
        type: "document",
        fields: [
          {
            name: "title",
            title: "Title",
            description: "Title of the page",
            type: "string",
            required: true,
          },
        ],
      },
    ],
  },
} satisfies AppConfig;
