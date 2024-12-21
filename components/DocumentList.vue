<script setup lang="ts">
defineProps<{
  documentName: string;
  // TODO: fix this type
  documentList: Record<string, any>[];
}>();
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-200 flex items-center h-16">
      <h2 class="font-bold">{{ capitalize(documentName) }} list</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documentList" :key="document.id">
          <ULink :to="`/document/${document.id}`">
            {{ document.data.title }}
          </ULink>
        </li>
      </ul>
    </nav>
  </section>
</template>
