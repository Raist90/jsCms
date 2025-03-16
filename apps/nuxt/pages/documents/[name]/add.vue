<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import config from "@/cmsConfig";

const {
  schema: { documents },
} = config;

const route = useRoute();
const { currentDocumentName } = useExtractRouteData(route);
// TODO: I need to create a composable or utility that interacts with config
const document = documents.find(
  (document) => document.name === currentDocumentName.value,
);
</script>

<template>
  <section v-if="document" class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`New ${document.name}`" />
    </header>

    <DocumentForm :document />
  </section>
</template>
