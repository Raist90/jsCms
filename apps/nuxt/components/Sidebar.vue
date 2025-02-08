<script setup lang="ts">
import type { Document } from "~/types";
import { getDocumentName } from "~/documents";
import { Link } from "jscms-ui";

defineProps<{ documents: Document[] }>();

const route = useRoute();

const documentName = computed(() => getDocumentName());
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-700 flex items-center h-16">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <Link
            :class="['block p-2 rounded-md']"
            :to="`/documents/${document.name}`"
            :active="!!(document.name === documentName)"
            :activeClass="
              route.path === `/documents/${documentName}` ||
              route.path === `/documents/${documentName}/add`
                ? 'bg-primary'
                : 'bg-primary/20'
            "
            >{{ document.title }}</Link
          >
        </li>
      </ul>
    </nav>
  </section>
</template>
