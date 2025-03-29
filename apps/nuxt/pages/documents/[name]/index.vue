<script setup lang="ts">
const route = useRoute();
const { currentDocumentEntryName: documentEntryName } =
  useExtractRouteData(route);
</script>

<template>
  <section class="w-full">
    <header
      class="p-4 border-b border-gray-700 flex justify-between items-center h-16"
    >
      <div class="flex gap-x-3 items-center">
        <h2
          class="font-bold"
          v-text="`${capitalize(documentEntryName)} list`"
        />
      </div>

      <UIButton
        variant="outline"
        size="sm"
        @click="navigateTo(`/documents/${documentEntryName}/add`)"
        >Add a new {{ documentEntryName }}</UIButton
      >
    </header>
  </section>
</template>
