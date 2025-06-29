import { useDocumentsStore } from "~/store/documentsStore";

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp();
  if (!nuxtApp.payload.data.documentsEntries?.length) {
    const { data, error } = useAsyncData("documentsEntries", () =>
      $fetch("/api/documents", {
        method: "get",
      }),
    );

    // TODO: We should probably crash the app here
    if (error.value || !data.value) return;

    const store = useDocumentsStore();
    store.documentsEntries = data.value;
  }
});
