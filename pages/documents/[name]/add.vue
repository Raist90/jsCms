<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import config from "@/cmsConfig";
import { getDocumentName } from "~/documents";

const {
  schema: { documents },
} = config;

const documentName = getDocumentName();
const documentIdx = documents.findIndex(
  (document) => document.name === documentName,
);
const document = documents[documentIdx];
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`New ${document.name}`" />
    </header>

    <DocumentForm :document="document" />
  </section>
</template>
