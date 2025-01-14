import { useDocumentsStore } from "~/store/documentsStore";

export default defineNuxtPlugin(() => {
  const store = useDocumentsStore();
  if (!store.documentsData.length) {
    const { data } = useFetch("/api/documents", {
      method: "get",
    });

    if (!data.value) return;
    store.documentsData = data.value;
  }
});
