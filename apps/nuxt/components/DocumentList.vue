<script setup lang="ts">
import { useDocumentsStore } from "~/store/documentsStore";
import { Link } from "jscms-ui";

const props = defineProps<{
  documentName: string;
}>();

const documentName = computed(() => props.documentName);
const documentsStore = useDocumentsStore();
const { documentsData } = storeToRefs(documentsStore);
// TODO: perform this operations on `documents/index.ts`
const documentList = computed(() =>
  documentsData.value?.filter((doc) => doc.type === documentName.value),
);

const route = useRoute();
const currentPath = computed(() => route.path);
</script>

<template>
  <section v-if="documentName">
    <header class="p-4 border-b border-gray-700 flex items-center h-16">
      <h2 class="font-bold">{{ capitalize(documentName) }} list</h2>
    </header>

    <ClientOnly>
      <nav v-if="documentList.length" class="p-4">
        <ul class="grid gap-y-2">
          <li v-for="document in documentList" :key="document.id">
            <Link
              :class="['block p-2 rounded-md']"
              :to="`/documents/${document.type}/id/${document.id}`"
              :active="currentPath.includes(document.id)"
              activeClass="bg-primary"
            >
              {{ document.data.title }}
            </Link>
          </li>
        </ul>
      </nav>
    </ClientOnly>
  </section>
</template>
