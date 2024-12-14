import type { Document } from "~/types";
import { z } from "zod";
import { isBoolean, isFunction } from "@sindresorhus/is";
import { isObjectField } from "~/predicates";

export { validateDocumentFields };

function validateDocumentFields(
  fields: Document["fields"],
  formData: Record<string, any>,
) {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    if (
      (isBoolean(field.required) && !field.required) ||
      (isFunction(field.required) && !field.required(formData))
    )
      continue;

    const fieldName = field.name;
    if (!(fieldName in formData)) {
      errors[fieldName] = `Field ${fieldName} is required`;
      continue;
    }

    if (isObjectField(field.type) && "fields" in field) {
      return validateDocumentFields(field.fields, formData[fieldName]);
    }

    const { error } = validateFieldType(field, formData[fieldName]);
    if (error) errors[fieldName] = error;
  }

  if (Object.keys(errors).length) return errors;
  return;
}

function validateFieldType(
  field: Document["fields"][number],
  fieldValue: unknown,
) {
  let errMsg: string | null = null;

  const validatorSchema = z.object({
    string: z.string().min(1),
    number: z.number(),
    boolean: z.boolean(),
  });

  const fieldName = field.name;
  const fieldType = field.type;

  if (
    fieldType === "string" ||
    fieldType === "number" ||
    fieldType === "boolean"
  ) {
    const { success } = validatorSchema.shape[fieldType].safeParse(fieldValue);

    if (!success)
      errMsg = `Field ${fieldName} must be a valid "${fieldType}". You provided "${fieldValue}" instead`;
  } else {
    errMsg = `Field "${fieldName}" is invalid`;
  }

  return { error: errMsg };
}
