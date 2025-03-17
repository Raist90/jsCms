import type { DocumentEntry } from "~/types";

export function useFilterDocumentsEntries(
  documentsEntries: MaybeRef<DocumentEntry[]>,
) {
  const filterDocumentsEntriesByType = (type: MaybeRef<string>) =>
    computed(() => {
      const unrefedDocuments = unref(documentsEntries);
      const unrefedType = unref(type);
      return unrefedDocuments.filter((doc) => doc.type === unrefedType);
    });

  return {
    filterDocumentsEntriesByType,
  };
}
