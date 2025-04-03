import { describe, expect, test } from "vitest";
import { stripFieldsMissingInDefinition } from "./stripFieldsMissingInDefinition";
import {
  validDocumentMock,
  validDocumentWithNestedObject,
} from "~/tests/mocks/documents";

// TODO: Add more tests
describe("stripFieldsMissingInDefinition", async () => {
  describe("With regular fields and object type", () => {
    test("Should NOT strip any fields from definition", async () => {
      const documentEntryData = validDocumentMock.formData;
      const documentDefinitionFields = validDocumentMock.document.fields;

      const result = stripFieldsMissingInDefinition(
        documentEntryData,
        documentDefinitionFields,
      );

      expect(result).toStrictEqual(documentEntryData);
    });
  });

  describe("With nested object fields", () => {
    test("Should NOT strip any fields from definition", async () => {
      const documentEntryData = validDocumentWithNestedObject.formData;
      const documentDefinitionFields =
        validDocumentWithNestedObject.document.fields;

      const result = stripFieldsMissingInDefinition(
        documentEntryData,
        documentDefinitionFields,
      );

      expect(result).toStrictEqual(documentEntryData);
    });
  });
});
