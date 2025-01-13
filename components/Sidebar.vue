<script setup lang="ts">
import type { Document } from "~/types";
import { getDocumentName } from "~/documents";

defineProps<{ documents: Document[] }>();

const routeParam = computed(() => getDocumentName());
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-700 flex items-center h-16">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <ULink
            :class="['block p-2 rounded-md']"
            :to="`/documents/${document.name}`"
            :active="!!(document.name === routeParam)"
            activeClass="bg-primary/20"
            >{{ document.title }}</ULink
          >
        </li>
      </ul>
    </nav>
  </section>
</template>
