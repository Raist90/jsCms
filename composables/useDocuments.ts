export async function useDocuments() {
  try {
    const { data: documents, error } = await useFetch("/api/documents");
    if (error.value) throw error.value;

    return documents;
  } catch (e) {
    console.error("Error fetching documents", e);

    return;
  }
}
