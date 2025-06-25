import { isBoolean, isFunction, isNumber, isString } from "@sindresorhus/is";
import { z } from "zod";

import { isArrayField, isObjectField } from "~/predicates";
import type { DocumentDefinition } from "~/types";

export { validateDocumentFields };

function validateDocumentFields(
  fields: DocumentDefinition["fields"],
  formData: Record<string, any>,
) {
  const errors: Record<string, string> = {};

  for (const field of fields) {
    const fieldName = field.name;

    if (isArrayField(field.type)) {
      if (!("min" in field) && !("max" in field)) continue;

      if ("of" in field) {
        if (isNumber(field.min)) {
          if (formData[fieldName].length < field.min)
            errors[fieldName] =
              `Field ${fieldName} must have at least ${field.min} items`;
        }

        if (isNumber(field.max)) {
          if (formData[fieldName].length > field.max)
            errors[fieldName] =
              `Field ${fieldName} must have at most ${field.max} items`;
        }

        if (field.of === "string") {
          const itemsList = Object.entries({ ...formData[fieldName] });

          for (const item of itemsList) {
            const [itemKey, itemVal] = item;

            if (isString(itemVal) && !itemVal.length) {
              const key = parseInt(itemKey, 10);
              errors[`${fieldName}[${key}]`] =
                `Field ${field.title}[${key}] must be a valid string`;
            }
          }
        }

        continue;
      }
    }

    if (
      (isBoolean(field.required) && !field.required) ||
      (isFunction(field.required) && !field.required(formData))
    )
      continue;

    if (
      !(fieldName in formData) ||
      // Don't accept empty strings as valid values
      isString(formData[fieldName] && !formData[fieldName].length)
    ) {
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
  field: DocumentDefinition["fields"][number],
  fieldValue: unknown,
) {
  let errMsg: string | null = null;

  const validatorSchema = z.object({
    string: z.string(),
    number: z.number(),
    boolean: z.boolean(),
    slug: z.string().min(1),
  });

  const fieldName = field.name;
  const fieldType = field.type;

  if (
    fieldType === "string" ||
    fieldType === "number" ||
    fieldType === "boolean" ||
    fieldType === "slug"
  ) {
    const { success } = validatorSchema.shape[fieldType].safeParse(fieldValue);

    if (!success)
      errMsg = `Field ${fieldName} must be a valid "${fieldType}". You provided "${fieldValue}" instead`;
  } else {
    errMsg = `Field "${fieldName}" is invalid`;
  }

  return { error: errMsg };
}
