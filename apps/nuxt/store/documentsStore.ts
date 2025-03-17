import type { DocumentJsonModel } from "~/types";

export const useDocumentsStore = defineStore("documents", () => {
  // States
  const documentsData = ref<DocumentJsonModel[]>([]);

  // Actions
  async function getDocumentDataById(id?: string) {
    const { data } = await useFetch<DocumentJsonModel>(
      `/api/document/data/id/${id}`,
      {
        method: "GET",
      },
    );
    return data.value;
  }

  async function patchDocumentsData(
    operation: "add" | "update" | "delete",
    data: Omit<DocumentJsonModel, "timestamp">,
  ) {
    const updateDocumentsStore = async () => {
      const data = await $fetch("/api/documents", {
        method: "GET",
      });
      documentsData.value = data;
    };

    const addOrUpdateDocument = async () =>
      await $fetch("/api/documents", {
        method: "POST",
        body: data,
      });

    const deleteDocument = async () =>
      await $fetch(`/api/document/delete/id/${data.id}`, {
        method: "POST",
      });

    if (operation !== "delete") await addOrUpdateDocument();
    else await deleteDocument();

    await updateDocumentsStore();
  }

  return {
    // State
    documentsData,

    // Actions
    getDocumentDataById,
    patchDocumentsData,
  };
});
