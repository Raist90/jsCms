<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import { useDocumentsStore } from "~/store/documentsStore";
import type { DocumentEntry } from "~/types";

const { getDocumentEntryById, patchDocumentEntry } = useDocumentsStore();
const toast = useToast();
const route = useRoute();
const { findDocumentDefinitionByType } = useCmsConfig();

const { currentPageId: documentId } = useExtractRouteData(route);
const documentEntry = await getDocumentEntryById(documentId.value);
const documentDefinition =
  (documentEntry && findDocumentDefinitionByType(documentEntry?.type)) || null;

async function onDocumentDataDelete(documentEntry: DocumentEntry) {
  await patchDocumentEntry("delete", documentEntry);
  navigateTo(`/documents/${documentEntry.type}`);

  toast.add({
    isOpen: true,
    message: `${capitalize(documentEntry.type)} correctly deleted!`,
    onClose: () => {
      toast.clear();
    },
    msTimeout: 2500,
  });
}

const isConfirmModalOpen = ref(false);
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="documentEntry?.data.title" />
    </header>

    <DocumentForm
      v-if="documentEntry && documentDefinition"
      v-model="documentEntry"
      :documentDefinition
      @document-entry-delete="isConfirmModalOpen = true"
    />

    <UIModal
      v-if="documentEntry"
      :isOpen="isConfirmModalOpen"
      title="Are you sure?"
      @close="isConfirmModalOpen = false"
    >
      <template #content>
        <p>Are you sure you want to delete this document?</p>
      </template>

      <template #cta>
        <div class="flex justify-between">
          <UIButton
            variant="danger"
            type="button"
            @click="onDocumentDataDelete(documentEntry)"
            >Delete</UIButton
          >
          <UIButton
            variant="outline"
            type="button"
            @click="isConfirmModalOpen = false"
            >Cancel</UIButton
          >
        </div>
      </template>
    </UIModal>
  </section>
</template>
