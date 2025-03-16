<script setup lang="ts">
import type { Document } from "~/types";

defineProps<{ documents: Document[] }>();

const route = useRoute();
const { currentDocumentName } = useExtractRouteData(route);
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-700 flex items-center h-16">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <NuxtLink
            class="block p-2 rounded-md"
            :class="[
              document.name === currentDocumentName &&
                (((route.path === `/documents/${document.name}` ||
                  route.path === `/documents/${document.name}/add`) &&
                  'bg-blue-500') ||
                  'bg-blue-500/20'),
            ]"
            :to="`/documents/${document.name}`"
            >{{ document.title }}</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </section>
</template>
