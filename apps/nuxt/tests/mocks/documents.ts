import {
  addDocument,
  type DocumentDefinition,
  type DocumentEntry,
} from "~/types";

export {
  validDocumentMock,
  invalidDocumentMock,
  validDocumentWithNestedObject,
  invalidDocumentWithNestedObject,
};

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
  } satisfies DocumentDefinition),
  formData: {
    title: "Hello world",
    slug: "hello-world",
    body: {
      header: {
        title: "Hello world",
        subtitle: "This is a test",
      },
    },
  } satisfies DocumentEntry["data"],
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
  } satisfies DocumentDefinition,
  formData: {
    title: "Hello world",
  } satisfies DocumentEntry["data"],
};

const validDocumentWithNestedObject = {
  document: {
    name: "mock",
    title: "Mock",
    description: "A mock document with nested objects",
    type: "document",
    fields: [
      {
        name: "mockParent",
        title: "Mock parent",
        description: "A mock parent object",
        type: "object",
        required: true,
        fields: [
          {
            name: "mockChild",
            title: "Mock child",
            description: "A mock child object",
            type: "object",
            required: true,
            fields: [
              {
                name: "mockGrandchild",
                title: "Mock grandchild",
                description: "A mock grandchild object",
                type: "object",
                required: true,
                fields: [
                  {
                    name: "title",
                    title: "Title",
                    description: "The title of the grandchild",
                    type: "string",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  } satisfies DocumentDefinition,
  formData: {
    mockParent: {
      mockChild: {
        mockGrandchild: {
          title: "Hello world",
        },
      },
    },
  },
};

const invalidDocumentWithNestedObject = {
  document: validDocumentWithNestedObject.document,
  formData: {
    mockParent: {
      mockChild: {
        mockGrandchild: {
          someArbytraryField: "Hello world",
        },
      },
    },
  } satisfies DocumentEntry["data"],
};
