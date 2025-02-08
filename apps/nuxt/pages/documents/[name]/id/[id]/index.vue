<script setup lang="ts">
import config from "@/cmsConfig";
import DocumentForm from "~/components/DocumentForm.vue";
import { useDocumentsStore } from "~/store/documentsStore";
import { getDocumentId } from "~/documents";
import type { DocumentJsonModel } from "~/types";

const { getDocumentDataById, patchDocumentsData } = useDocumentsStore();
// const toast = useToast();

const documentId = getDocumentId();
const documentData = await getDocumentDataById(documentId);
const documentSchema = config.schema.documents.find(
  (document) => document.name === documentData?.type,
);

async function onDocumentDataDelete(documentData: DocumentJsonModel) {
  await patchDocumentsData("delete", documentData);
  navigateTo(`/documents/${documentData.type}`);

  // toast.add({
  //   timeout: 1500,
  //   title: `${capitalize(documentData.type)} correctly deleted!`,
  // });
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
      @document-data-delete="onDocumentDataDelete(documentData)"
    />
  </section>
</template>
