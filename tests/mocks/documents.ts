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
      {
        description: "This is the mock body",
        name: "body",
        required: true,
        title: "Body",
        type: "object",
        fields: [
          {
            description: "This is the mock body header",
            name: "header",
            required: true,
            title: "Header",
            type: "object",
            fields: [
              {
                description: "This is the mock body header title",
                name: "title",
                required: true,
                title: "Title",
                type: "string",
              },
              {
                description: "This is the mock body header subtitle",
                name: "subtitle",
                required: true,
                title: "Subtitle",
                type: "string",
              },
            ],
          },
        ],
      },
    ],
  }),
  formData: {
    title: "Hello world",
    slug: "hello-world",
    body: {
      header: {
        title: "Hello world",
        subtitle: "This is a test",
      },
    },
  },
};

const invalidDocumentMock = {
  document: {
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
  },
  formData: {
    title: "Hello world",
  },
};
