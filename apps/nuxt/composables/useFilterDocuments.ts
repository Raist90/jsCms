import type { DocumentJsonModel } from "~/types";

export function useFilterDocuments(documents: MaybeRef<DocumentJsonModel[]>) {
  const filterDocumentsByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedDocuments = unref(documents);
      const unrefedType = unref(type);
      return unrefedDocuments.filter((doc) => doc.type === unrefedType);
    });

  return {
    filterDocumentsByType,
  };
}
