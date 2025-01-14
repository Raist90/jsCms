import type { DocumentJsonModel } from "~/types";

export const useDocumentsStore = defineStore("documents", () => {
  const documentsData = ref<DocumentJsonModel[]>([]);

  async function initializeDocumentsStore() {
    const data = await $fetch("/api/documents", {
      method: "get",
    });

    documentsData.value = data;
  }

  async function patchDocumentsData(
    operation: "add" | "update" | "delete",
    data: Omit<DocumentJsonModel, "timestamp">,
  ) {
    if (operation !== "delete") {
      await $fetch("/api/documents", {
        method: "post",
        body: {
          id: data.id,
          type: data.type,
          data: data.data,
        },
      });
    } else {
      await $fetch(`/api/document/delete/id/${data.id}`, {
        method: "POST",
      });
    }

    await initializeDocumentsStore();
  }

  const documentsList = computed(() =>
    documentsData.value?.map((doc) => doc.data.title),
  ) as ComputedRef<string[]>;

  return {
    // State
    documentsData,

    // Getters
    documentsList,

    // Actions
    initializeDocumentsStore,
    patchDocumentsData,
  };
});
