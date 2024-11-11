import { addDocument } from "~/types";

export { validDocumentMock, invalidDocumentMock };

const validDocumentMock = {
  document: addDocument({
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
  }),
  formData: {
    title: "Hello world",
    slug: "hello-world",
  },
};

const invalidDocumentMock = {
  document: {},
  formData: {
    title: "Hello world",
  },
};
