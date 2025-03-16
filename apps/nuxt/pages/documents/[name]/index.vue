<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";

const route = useRoute();
const { currentDocumentName: documentName } = useExtractRouteData(route);

const documentsStore = useDocumentsStore();
const { documentsData } = storeToRefs(documentsStore);
const { filterDocumentsByType } = useFilterDocuments(documentsData);
const documentsList = filterDocumentsByType(documentName);
</script>

<template>
  <ClientOnly>
    <section class="w-full">
      <header
        class="p-4 border-b border-gray-700 flex justify-between items-center h-16"
      >
        <div class="flex gap-x-3 items-center">
          <h2 class="font-bold" v-text="`${capitalize(documentName)} list`" />
        </div>

        <UIButton
          variant="outline"
          size="sm"
          @click="navigateTo(`/documents/${documentName}/add`)"
          >Add a new {{ documentName }}</UIButton
        >
      </header>

      <div v-if="documentsList.length" class="p-4">
        <!-- <UTable v-model="selected" :columns="columns" :rows="list" /> -->
      </div>
    </section>
  </ClientOnly>
</template>
