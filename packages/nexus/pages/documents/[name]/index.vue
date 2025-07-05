<script setup lang="ts">
import DeleteDocumentEntriesModal from "~/components/modals/DeleteDocumentEntriesModal.vue";
import { useDocumentsStore } from "~/store/documentsStore";

const route = useRoute();
const { currentDocumentEntryName: documentEntryName } =
  useExtractRouteData(route);

const documentStore = useDocumentsStore();
const { documentsEntries: allDocumentsEntries } = storeToRefs(documentStore);
const documentsEntries = computed(() => {
  return allDocumentsEntries.value.filter(
    (entry) => entry.type === documentEntryName.value,
  );
});

const columns = computed(() =>
  documentsEntries.value?.length
    ? [
        "id",
        ...Object.keys(documentsEntries.value?.[0]?.data).sort((a, b) => {
          if (a === "title") return -1;
          if (b === "title") return 1;
          return a.localeCompare(b);
        }),
        "createdAt",
      ]
    : [],
);

const rows = computed(() => {
  return documentsEntries.value.map((entry) => {
    const row = {
      id: entry.id,
      ...entry.data,
      createdAt: entry.timestamp,
    };

    return Object.fromEntries(
      Object.entries(row).sort(
        (a, b) => columns.value.indexOf(a[0]) - columns.value.indexOf(b[0]),
      ),
    );
  });
});

const toast = useToast();

const selectedRow = ref<typeof rows.value>([]);
async function onConfirmDeleteSelected() {
  // TODO: Delete in bulk instead of one by one
  selectedRow.value.map(async (row) => {
    try {
      const entryToDelete = documentsEntries.value.find(
        (entry) => entry.id === row.id,
      );
      if (!entryToDelete) {
        throw new Error(`Document entry with id ${row.id} not found.`);
      }

      await documentStore.patchDocumentEntry("delete", entryToDelete);

      selectedRow.value = selectedRow.value.filter(
        (selected) => selected.id !== row.id,
      );
      isDeleteDocumentEntriesModalOpen.value = false;

      toast.add({
        isOpen: true,
        message: "Documents correctly deleted!",
        onClose: () => {
          toast.clear();
        },
        msTimeout: 2500,
      });
    } catch (e) {
      toast.add({
        isOpen: true,
        message:
          "Error deleting documents" +
          (e instanceof Error ? `: ${e.message}` : ""),
      });
    }
  });
}

const isDeleteDocumentEntriesModalOpen = ref(false);
</script>

<template>
  <section class="w-full">
    <header
      class="flex h-16 items-center justify-between border-b border-gray-700 p-4"
    >
      <div class="flex items-center gap-x-3">
        <h2
          class="font-bold"
          v-text="`${capitalize(documentEntryName)} list`"
        />
      </div>

      <div class="flex gap-x-2">
        <UIButton
          v-if="selectedRow.length"
          variant="danger"
          size="sm"
          class="font-bold"
          @click="isDeleteDocumentEntriesModalOpen = true"
          >Delete {{ documentEntryName }}({{ selectedRow.length }})</UIButton
        >
        <UIButton
          variant="outline"
          size="sm"
          class="font-bold"
          @click="navigateTo(`/documents/${documentEntryName}/add`)"
          >Add a new {{ documentEntryName }}</UIButton
        >
      </div>
    </header>

    <UITable
      v-if="documentsEntries.length"
      v-model="selectedRow"
      :columns
      :rows
    />

    <DeleteDocumentEntriesModal
      :isOpen="isDeleteDocumentEntriesModalOpen"
      @close="isDeleteDocumentEntriesModalOpen = false"
      @confirm-document-entry-delete="onConfirmDeleteSelected()"
    />
  </section>
</template>
