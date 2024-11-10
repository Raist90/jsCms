<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import config from "@/cmsConfig";

const { schema } = config;
const documents = schema.documents;

const { params } = useRoute();
const documentName =
  typeof params.name === "string" ? params.name : params.name[0];
const documentIdx = documents.findIndex(
  (document) => document.name === documentName,
);
const document = documents[documentIdx];
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-200 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="`New ${document.name}`" />
    </header>

    <div class="py-4 px-8 h-full">
      <DocumentForm :document="document" />
    </div>
  </section>
</template>
