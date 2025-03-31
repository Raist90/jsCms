<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";

const route = useRoute();
const { currentDocumentEntryName: documentEntryType } =
  useExtractRouteData(route);

const { findDocumentDefinitionByType } = useCmsConfig();
const documentDefinition = findDocumentDefinitionByType(documentEntryType);
</script>

<template>
  <section v-if="documentDefinition" class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`New ${documentDefinition.name}`" />
    </header>

    <DocumentForm :documentDefinition />
  </section>
</template>
