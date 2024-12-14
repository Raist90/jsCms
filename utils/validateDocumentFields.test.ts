import { describe, test, expect } from "vitest";
import { validateDocumentFields } from "./validateDocumentFields";
import { mocks } from "~/tests/mocks";

const {
  documents: { valid, withFormDataMismatch },
} = mocks;

describe("validateDocumentFields", async () => {
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
