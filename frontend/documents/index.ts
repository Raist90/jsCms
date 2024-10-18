export { page };

import { addDocument } from "@/types";

const page = addDocument({
  description: "This is a page",
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    {
      description: "This is the page title",
      name: "title",
      required: true,
      title: "Title",
      type: "string",
    },
  ],
});
