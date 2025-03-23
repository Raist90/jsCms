import type { DocumentDefinition } from "~/types";

export {
  isArrayField,
  isBooleanField,
  isNumberField,
  isObjectField,
  isPrimitiveField,
  isStringField,
  isSlugField,
  isValidUUID,
};

type FieldType = DocumentDefinition["fields"][number]["type"];

function isPrimitiveField(fieldType: FieldType) {
  return !!(
    fieldType === "string" ||
    fieldType === "number" ||
    fieldType === "boolean" ||
    fieldType === "slug"
  );
}

function isBooleanField(fieldType: FieldType) {
  return !!(fieldType === "boolean");
}

function isNumberField(fieldType: FieldType) {
  return !!(fieldType === "number");
}

function isObjectField(fieldType: FieldType) {
  return !!(fieldType === "object");
}

function isStringField(fieldType: FieldType) {
  return !!(fieldType === "string");
}

function isSlugField(fieldType: FieldType) {
  return !!(fieldType === "slug");
}

function isArrayField(fieldType: FieldType) {
  return !!(fieldType === "array");
}

/**
 * Check if a string is a valid UUID.
 * @param id The string to check.
 * @returns Whether the string is a valid UUID.
 */
function isValidUUID(
  id: string,
): id is `${string}-${string}-${string}-${string}-${string}` {
  return (
    id.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    ) !== null
  );
}
