import type { Document } from "~/types";
import { z } from "zod";

export { validateDocumentFields };

function validateDocumentFields(
  document: Document,
  // FIX: this should not be named as it is because I think it's still not a json but an object coming from a form
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

    const error = validateFieldType(formData[fieldName]);
    if (error) {
      errors[fieldName] = error;
    }
  }
  if (Object.keys(errors).length) return errors;
  return;
}

function validateFieldType(field: unknown) {
  let errMsg: string | null = null;

  switch (typeof field) {
    case "string": {
      const { success } = z.string().safeParse(field);

      if (!success) {
        errMsg = `Field ${field} must be a string`;
      }
      break;
    }
    case "number":
      {
        const { success } = z.number().safeParse(field);

        if (!success) {
          errMsg = `Field ${field} must be a number`;
        }
      }
      break;
    case "boolean":
      {
        const { success } = z.boolean().safeParse(field);

        if (!success) {
          errMsg = `Field ${field} must be a boolean`;
        }
      }
      break;
    case "object":
      {
        const keys = Object.keys(field as object);
        keys.map((key) => validateFieldType(key));
      }
      break;
    default:
      errMsg = `Field ${field} is invalid`;
  }

  if (errMsg) return errMsg;
  return;
}
