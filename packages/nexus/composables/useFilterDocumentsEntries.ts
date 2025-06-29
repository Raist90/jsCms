import type { DocumentEntry } from "~/types";

export function useFilterDocumentsEntries(
  documentsEntries: Ref<DocumentEntry[]>,
) {
  const filterDocumentsEntriesByType = (type: Ref<string>) =>
    computed(() =>
      documentsEntries.value.filter((doc) => doc.type === type.value),
    );

  return {
    filterDocumentsEntriesByType,
  };
}
