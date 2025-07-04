import { describe, expect, test } from "vitest";

import { mocks } from "~/tests/mocks";

import { validateDocumentFields } from "./validateDocumentFields";

const {
  documents: {
    valid,
    withFormDataMismatch,
    validWithNestedObject,
    invalidWithNestedObject,
  },
} = mocks;

describe("validateDocumentFields", async () => {
  describe("With regular fields and object type", () => {
    test("Should NOT return errors", async () => {
      const errors = validateDocumentFields(
        valid.document.fields,
        valid.formData,
      );
      expect(errors).toBeUndefined();
    });

    test("Should return errors", async () => {
      const errors = validateDocumentFields(
        valid.document.fields,
        withFormDataMismatch.formData,
      );
      expect(errors).toBeTypeOf("object");
    });
  });

  describe("With nested object fields", () => {
    test("Should NOT return errors", async () => {
      const errors = validateDocumentFields(
        validWithNestedObject.document.fields,
        validWithNestedObject.formData,
      );
      expect(errors).toBeUndefined();
    });

    test("Should return errors", async () => {
      const errors = validateDocumentFields(
        validWithNestedObject.document.fields,
        invalidWithNestedObject.formData,
      );
      expect(errors).toBeTypeOf("object");
    });
  });
});
