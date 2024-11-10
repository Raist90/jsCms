import type { Document } from "~/types";
import { z } from "zod";
import {
  isArray,
  isBoolean,
  isNonEmptyObject,
  isNumber,
  isString,
} from "@sindresorhus/is";

export { validateDocumentFields };

function validateDocumentFields(
  document: Document,
  formData: Record<string, unknown>,
) {
  const errors: Record<string, string> = {};
  const fields = document.fields;

  for (const field of fields) {
    const fieldName = field.name;
    const isRequired = field.required;

    if (isRequired && !(fieldName in formData)) {
      errors[fieldName] = `Field ${fieldName} is required`;
      continue;
    }

    const { error } = validateFieldType(formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  }

  if (Object.keys(errors).length) return errors;
  return;
}

function validateFieldType(field: unknown) {
  let errMsg: string | null = null;
  const validatorSchema = z.object({
    string: z.string(),
    number: z.number(),
    boolean: z.boolean(),
  });

  if (isNonEmptyObject(field) || isArray(field))
    Object.values(field).map((field) => validateFieldType(field));
  else if (isString(field) || isNumber(field) || isBoolean(field)) {
    const { success } =
      validatorSchema.shape[
        typeof field as "string" | "number" | "boolean" // seems like ts is unable to infer `typeof`
      ].safeParse(field);

    if (!success) errMsg = `Field ${field} must be a ${typeof field}`;
  } else {
    errMsg = `Field ${String(field)} is invalid`;
  }

  return { error: errMsg };
}
