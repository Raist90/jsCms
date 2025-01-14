<script setup lang="ts">
import { getDocumentName } from "~/documents";
import { useDocumentsStore } from "~/store/documentsStore";

const documentName = computed(() => getDocumentName());

const documentsStore = useDocumentsStore();
const { documentsData } = storeToRefs(documentsStore);
const list = computed(() =>
  documentsData.value?.filter((doc) => doc.type === documentName.value),
);

const selected = ref(list.value.length ? [list.value?.[0]] : []);
const columns = computed(() => {
  return Object.keys(list?.value?.[0]).map((key) => ({
    key,
    label: capitalize(key),
  }));
});

watch(list, (val) => {
  if (val.length) {
    selected.value = [val[0]];
  } else selected.value = [];
});

function onDeleteSelected() {
  selected.value.forEach(async (doc) => {
    await documentsStore.patchDocumentsData("delete", doc);
  });
}
</script>

<template>
  <ClientOnly>
    <section v-if="documentName" class="w-full">
      <header
        class="p-4 border-b border-gray-700 flex justify-between items-center h-16"
      >
        <div class="flex gap-x-3 items-center">
          <h2 class="font-bold" v-text="`${capitalize(documentName)} list`" />
          <UButton
            :to="`/documents/${documentName}/add`"
            size="xs"
            icon="heroicons:pencil-square"
            color="gray"
            >Add {{ documentName }}</UButton
          >
        </div>

        <UButton
          v-if="selected.length"
          size="xs"
          icon="heroicons:trash"
          color="red"
          @click="onDeleteSelected"
          >Delete
          {{
            `${selected.length} ${documentName + (selected.length > 1 ? "(s)" : "")}`
          }}</UButton
        >
      </header>

      <div v-if="list.length" class="px-4 py-2">
        <UTable v-model="selected" :columns="columns" :rows="list" />
      </div>
    </section>
  </ClientOnly>
</template>
