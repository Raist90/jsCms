<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";

const route = useRoute();
const { currentDocumentEntryName: documentEntryName } =
  useExtractRouteData(route);

const { documentsEntries: allDocumentsEntries } = useDocumentsStore();
const documentsEntries = computed(() => {
  return allDocumentsEntries.filter(
    (entry) => entry.type === documentEntryName.value,
  );
});

const columns = [
  "id",
  ...Object.keys(documentsEntries.value[0].data),
  "createdAt",
];

const rows = computed(() => {
  return documentsEntries.value.map((entry) => ({
    id: entry.id,
    ...entry.data,
    timestamp: entry.timestamp,
  }));
});
</script>

<template>
  <section class="w-full">
    <header
      class="p-4 border-b border-gray-700 flex justify-between items-center h-16"
    >
      <div class="flex gap-x-3 items-center">
        <h2
          class="font-bold"
          v-text="`${capitalize(documentEntryName)} list`"
        />
      </div>

      <UIButton
        variant="outline"
        size="sm"
        class="font-bold"
        @click="navigateTo(`/documents/${documentEntryName}/add`)"
        >Add a new {{ documentEntryName }}</UIButton
      >
    </header>

    <UITable :columns :rows />
  </section>
</template>
