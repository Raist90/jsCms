import { addDocument } from "~/types";

export const documentMock = addDocument({
  description: "This is a document mock",
  name: "mock",
  title: "Mock",
  type: "document",
  fields: [
    {
      description: "This is the mock title",
      name: "title",
      required: true,
      title: "Title",
      type: "string",
    },
    {
      description: "This is the mock slug",
      name: "slug",
      required: true,
      title: "Slug",
      type: "string",
    },
  ],
});
