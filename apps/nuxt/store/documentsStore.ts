import type { DocumentEntry } from "~/types";

export const useDocumentsStore = defineStore("documents", () => {
  const nuxtApp = useNuxtApp();

  // States
  const documentsEntries = ref<DocumentEntry[]>(
    nuxtApp.payload.data.documentsEntries || [],
  );

  // Actions
  async function getDocumentEntryById(id?: string) {
    const { data } = await useFetch<DocumentEntry>(
      `/api/document/data/id/${id}`,
      {
        method: "GET",
      },
    );
    return data.value;
  }

  async function patchDocumentEntry(
    operation: "add" | "update" | "delete",
    data: Omit<DocumentEntry, "timestamp">,
  ) {
    const updateDocumentsEntries = async () => {
      const data = await $fetch("/api/documents", {
        method: "GET",
      });
      documentsEntries.value = data;
    };

    const addUpdateDocumentEntry = async () =>
      await $fetch("/api/documents", {
        method: "POST",
        body: data,
      });

    const deleteDocumentEntry = async () =>
      await $fetch(`/api/document/delete/id/${data.id}`, {
        method: "POST",
      });

    if (operation !== "delete") await addUpdateDocumentEntry();
    else await deleteDocumentEntry();

    await updateDocumentsEntries();
  }

  return {
    // State
    documentsEntries,

    // Actions
    getDocumentEntryById,
    patchDocumentEntry,
  };
});
