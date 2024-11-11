import { describe, test, expect } from "vitest";
import { validateDocumentFields } from "./validateDocumentFields";
import { validDocumentMock, invalidDocumentMock } from "~/tests/mocks";

describe("Zod document fields validator", async () => {
  test("Should validate a document", async () => {
    const errors = validateDocumentFields(
      validDocumentMock.document,
      validDocumentMock.formData,
    );
    expect(errors).toBeUndefined();
  });

  test("Should return errors when using wrong document data structure", async () => {
    const errors = validateDocumentFields(
      validDocumentMock.document,
      invalidDocumentMock.formData,
    );
    expect(errors).toBeTypeOf("object");
  });
});
