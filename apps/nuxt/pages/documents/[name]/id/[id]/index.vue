<script setup lang="ts">
import config from "@/cmsConfig";
import DocumentForm from "~/components/DocumentForm.vue";
import { useDocumentsStore } from "~/store/documentsStore";
import type { DocumentJsonModel } from "~/types";

const { getDocumentDataById, patchDocumentsData } = useDocumentsStore();
const toast = useToast();
const route = useRoute();

const isConfirmModalOpen = ref(false);

const { currentPageId: documentId } = useExtractRouteData(route);
const documentData = await getDocumentDataById(documentId.value);
const documentSchema = config.schema.documents.find(
  (document) => document.name === documentData?.type,
);

async function onDocumentDataDelete(documentData: DocumentJsonModel) {
  await patchDocumentsData("delete", documentData);
  navigateTo(`/documents/${documentData.type}`);

  toast.add({
    isOpen: true,
    message: `${capitalize(documentData.type)} correctly deleted!`,
    onClose: () => {
      toast.clear();
    },
    msTimeout: 2500,
  });
}
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="documentData?.data.title" />
    </header>

    <DocumentForm
      v-if="documentData && documentSchema"
      v-model="documentData"
      :document="documentSchema"
      @document-data-delete="isConfirmModalOpen = true"
    />

    <UIModal
      v-if="documentData"
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
            @click="onDocumentDataDelete(documentData)"
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
