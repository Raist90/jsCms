<script setup lang="ts">
import type { DocumentDefinition } from "~/types";

defineProps<{ documents: DocumentDefinition[] }>();

const route = useRoute();
const { currentDocumentEntryName } = useExtractRouteData(route);
</script>

<template>
  <section>
    <header class="flex h-16 items-center border-b border-gray-700 p-4">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <NuxtLink
            class="block rounded-md p-2"
            :class="[
              document.name === currentDocumentEntryName &&
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
