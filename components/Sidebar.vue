<script setup lang="ts">
import type { Document } from "~/types";

defineProps<{ documents: Document[] }>();
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-200 flex items-center h-16">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="flex flex-col gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <ULink :to="`/documents/${document.name}`">{{
            document.title
          }}</ULink>
        </li>
      </ul>
    </nav>
  </section>
</template>
