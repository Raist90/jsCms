import type { Document } from "~/types";

export {
  isBooleanField,
  isNumberField,
  isObjectField,
  isPrimitiveField,
  isStringField,
};

type FieldType = Document["fields"][number]["type"];

function isPrimitiveField(fieldType: FieldType) {
  return !!(
    fieldType === "string" ||
    fieldType === "number" ||
    fieldType === "boolean"
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
