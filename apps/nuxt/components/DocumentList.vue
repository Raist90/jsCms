<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";
import type { DocumentJsonModel } from "~/types";

const props = defineProps<{
  documentType: string;
}>();

const documentType = computed(() => props.documentType);
const documentsStore = useDocumentsStore();
const { documentsData } = storeToRefs(documentsStore);
const { filterDocumentsByType } = useFilterDocuments(documentsData.value);
const documentsList = filterDocumentsByType(documentType);

const route = useRoute();
const { currentPath } = useExtractRouteData(route);

// TODO: It needs some testing with primitives.
function getFallbackTitle(document: DocumentJsonModel) {
  const { data } = document;
  const topLevelKey = Object.keys(data)[0];
  const topLevelValue = data[topLevelKey];

  if (typeof topLevelValue === "object") {
    const firstNestedKey = Object.keys(topLevelValue)[0];
    return topLevelValue[firstNestedKey];
  }
  return topLevelValue;
}
</script>

<template>
  <section v-if="documentType">
    <header class="p-4 border-b border-gray-700 flex items-center h-16">
      <h2 class="font-bold">{{ capitalize(documentType) }} list</h2>
    </header>

    <ClientOnly>
      <nav v-if="documentsList.length" class="p-4">
        <ul class="grid gap-y-2">
          <li v-for="document in documentsList" :key="document.id">
            <NuxtLink
              :class="['block p-2 rounded-md']"
              :to="`/documents/${document.type}/id/${document.id}`"
              :active="currentPath.includes(document.id)"
              activeClass="bg-blue-500"
            >
              {{ document.data.title || getFallbackTitle(document) }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </ClientOnly>
  </section>
</template>
