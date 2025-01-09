<script setup lang="ts">
import { useDocumentListByName } from "~/documents";

const props = defineProps<{
  documentName: string;
}>();

const documentName = computed(() => props.documentName);
const documentList = useDocumentListByName(documentName);
</script>

<template>
  <section v-if="documentName">
    <header class="p-4 border-b border-gray-200 flex items-center h-16">
      <h2 class="font-bold">{{ capitalize(documentName) }} list</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documentList" :key="document.id">
          <ULink :to="`/documents/${document.type}/id/${document.id}`">
            {{ document.data.title }}
          </ULink>
        </li>
      </ul>
    </nav>
  </section>
</template>
