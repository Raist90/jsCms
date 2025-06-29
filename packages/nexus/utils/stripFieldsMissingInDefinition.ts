import type { DocumentDefinition } from "~/types";

export const stripFieldsMissingInDefinition = (
  documentEntryData: Record<string, any>,
  documentDefinitionFields: DocumentDefinition["fields"],
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(documentEntryData)
      .filter(([key]) =>
        documentDefinitionFields.some((field) => field.name === key),
      )
      .map(([key, value]) => {
        const field = documentDefinitionFields.find((f) => f.name === key);
        if (field?.type === "object") {
          return [key, stripFieldsMissingInDefinition(value, field.fields)];
        }

        if (field?.type === "array" && typeof field.of === "object") {
          return [key, stripFieldsMissingInDefinition(value, field.of.fields)];
        }
        return [key, value];
      }),
  );
};
