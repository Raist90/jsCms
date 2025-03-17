<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";

const route = useRoute();
const { currentDocumentEntryName: documentEntryName } =
  useExtractRouteData(route);

const documentsStore = useDocumentsStore();
const { documentsEntries } = storeToRefs(documentsStore);
const { filterDocumentsEntriesByType } =
  useFilterDocumentsEntries(documentsEntries);
const documentsList = filterDocumentsEntriesByType(documentEntryName);
</script>

<template>
  <ClientOnly>
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
          @click="navigateTo(`/documents/${documentEntryName}/add`)"
          >Add a new {{ documentEntryName }}</UIButton
        >
      </header>

      <div v-if="documentsList.length" class="p-4">
        <!-- <UTable v-model="selected" :columns="columns" :rows="list" /> -->
      </div>
    </section>
  </ClientOnly>
</template>
