import type { Document } from "~/types";
import { z } from "zod";
import { isBoolean, isFunction } from "@sindresorhus/is";

export { validateDocumentFields };

function validateDocumentFields(
  document: Document,
  formData: Record<string, any>,
) {
  const errors: Record<string, string> = {};
  const fields = document.fields;

  for (const field of fields) {
    if (
      (isBoolean(field.required) && !field.required) ||
      (isFunction(field.required) && !field.required(formData))
    )
      continue;

    const fieldName = field.name;

    // NOTE: this works but we can't allow same field name across the document, even if nested in objects
    // TODO: make sure to cover `array` case as well
    if (field.type === "object") {
      field.fields.forEach((subfield) => {
        if (
          (isBoolean(subfield.required) && !subfield.required) ||
          (isFunction(subfield.required) &&
            !subfield.required(formData[field.name]))
        )
          return;

        if (!(subfield.name in formData[field.name])) {
          errors[subfield.name] = `Field ${subfield.name} is required`;
          return;
        }

        const { error } = validateFieldType(
          subfield,
          formData[field.name][subfield.name],
        );
        if (error) errors[fieldName] = error;
      });
    } else {
      if (!(fieldName in formData)) {
        errors[fieldName] = `Field ${fieldName} is required`;
        continue;
      }

      const { error } = validateFieldType(field, formData[fieldName]);
      if (error) errors[fieldName] = error;
    }
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
