<script setup lang="ts">
import type { Document } from "~/types";

const emit = defineEmits<{
  (e: "onSelectedNewDocument", document: Document): void;
}>();

const props = defineProps<{ documents: Document[] }>();
const documents = computed(() => props.documents);
console.log(props.documents);

type ElemsList = {
  name: string;
  isHidden: Ref<boolean>;
};

const hiddenDocumentsMap = computed(
  () =>
    documents.value.map((d) => {
      return {
        name: d.name,
        isHidden: ref(false),
      };
    }) satisfies ElemsList[],
);

const isDocumentHidden = (idx: number) => {
  return hiddenDocumentsMap.value[idx].isHidden.value;
};

const documentClick = (idx: number) => {
  hiddenDocumentsMap.value[idx].isHidden.value =
    !hiddenDocumentsMap.value[idx].isHidden.value;
};
</script>

<template>
  <section>
    <nav class="p-4">
      <h2 class="text-lg mb-2">Documents</h2>
      <ul>
        <li v-for="(document, idx) in documents" :key="document.name">
          <button class="flex gap-x-1 items-center" @click="documentClick(idx)">
            {{ document.title }}
            <LucideChevronDown />
          </button>

          <ul v-if="isDocumentHidden(idx)" class="text-sm">
            <li>
              <button @click="emit('onSelectedNewDocument', document)">
                Create a new {{ document.name }}
              </button>
            </li>
            <li>
              <a :href="`/documents/${document.name}`"
                >List all {{ document.name }} collection</a
              >
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </section>
</template>
