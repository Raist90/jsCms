<script setup lang="ts">
import type { Document, Schema } from "~/types";
import Sidebar from "./Sidebar.vue";
import DocumentForm from "./DocumentForm.vue";

defineProps<{ schema: Schema }>();

// TODO: sidebar can emit events to tell this components which view to load. Maybe...
// also make it desktop-first and hide `Sidebar` with css
// we will use another component for mobile navigation
const selectedDocument = ref<Document | null>();

const selectNewDocument = (document: Document) => {
  selectedDocument.value = document;
};
</script>

<template>
  <section class="flex gap-4">
    <div class="w-1/5 border-r border-gray-700 h-screen">
      <Sidebar
        :documents="schema.documents"
        @on-selected-new-document="selectNewDocument"
      />
    </div>

    <div class="p-4">
      <DocumentForm v-if="selectedDocument" :document="selectedDocument" />
    </div>
  </section>
</template>
