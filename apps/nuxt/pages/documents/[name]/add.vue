<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import config from "@/cmsConfig";

const {
  schema: { documents },
} = config;

const route = useRoute();
const { currentDocumentEntryName } = useExtractRouteData(route);
// TODO: I need to create a composable or utility that interacts with config
const documentDefinition = documents.find(
  (document) => document.name === currentDocumentEntryName.value,
);
</script>

<template>
  <section v-if="documentDefinition" class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`New ${documentDefinition.name}`" />
    </header>

    <DocumentForm :documentDefinition />
  </section>
</template>
