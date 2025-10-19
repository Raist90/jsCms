<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";

const props = defineProps<{
  documentEntryType: string;
}>();

const documentType = computed(() => props.documentEntryType);
const documentsStore = useDocumentsStore();
const { documentsEntries } = storeToRefs(documentsStore);
const { filterDocumentsEntriesByType } =
  useFilterDocumentsEntries(documentsEntries);
const documentsList = filterDocumentsEntriesByType(documentType);

const route = useRoute();
const { currentPath } = useExtractRouteData(route);
</script>

<template>
  <section v-if="documentType">
    <header class="flex h-16 items-center border-b border-gray-700 p-4">
      <h2 class="font-bold">{{ capitalize(documentType) }} list</h2>
    </header>

    <nav v-if="documentsList.length" class="p-4">
      <ul class="grid gap-y-2 text-sm">
        <li v-for="document in documentsList" :key="document.id">
          <NuxtLink
            :class="['block rounded-md p-2']"
            :to="`/documents/${document.type}/id/${document.id}`"
            :active="currentPath.includes(document.id)"
            activeClass="bg-blue-500"
          >
            {{ document.data.title || document.definition.title }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </section>
</template>
