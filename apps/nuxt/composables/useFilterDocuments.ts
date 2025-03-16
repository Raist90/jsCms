import type { DocumentJsonModel } from "~/types";

export function useFilterDocuments(documents: MaybeRef<DocumentJsonModel[]>) {
  const unrefedDocuments = unref(documents);

  const filterDocumentsByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedType = unref(type);
      return unrefedDocuments.filter((doc) => doc.type === unrefedType);
    });

  return {
    filterDocumentsByType,
  };
}
