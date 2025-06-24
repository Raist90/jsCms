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

      <UIButton
        variant="outline"
        size="sm"
        class="font-bold"
        @click="navigateTo(`/documents/${documentEntryName}/add`)"
        >Add a new {{ documentEntryName }}</UIButton
      >
    </header>

    <UITable v-if="documentsEntries.length" :columns :rows />
  </section>
</template>
