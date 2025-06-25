<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import { isValidUUID } from "~/predicates";
import { useDocumentsStore } from "~/store/documentsStore";
import type { DocumentDefinition, DocumentEntry } from "~/types";
import DeleteDocumentEntryModal from "~/components/modals/DeleteDocumentEntryModal.vue";
import UpdateDocumentDefinitionModal from "~/components/modals/UpdateDocumentDefinitionModal.vue";

const { getDocumentEntryById, patchDocumentEntry } = useDocumentsStore();
const toast = useToast();

const isUpdateDocumentDefinitionModalOpen = ref(false);
const isDeleteDocumentEntryModalOpen = ref(false);
const isLoading = ref(false);

const route = useRoute();
const {
  currentPageId: documentId,
  currentDocumentEntryName: documentEntryType,
} = useExtractRouteData(route);

const { data: documentEntry, status } = await useLazyAsyncData(
  `document-${documentId.value}`,
  () => getDocumentEntryById(documentId.value),
  {
    server: false,
  },
);
const documentEntryDefinition = computed(
  () => documentEntry?.value?.definition,
);

const { findDocumentDefinitionByType } = await useCmsConfig();
const documentDefinition = findDocumentDefinitionByType(documentEntryType);

const hasDefinitionsMismatch = computed<boolean>(() => {
  const stringifiedEntryDefinition = JSON.stringify(
    documentEntryDefinition.value,
  );
  const stringifiedDefinition = JSON.stringify(documentDefinition?.value);

  return stringifiedEntryDefinition !== stringifiedDefinition;
});

async function onConfirmDocumentEntryDelete(documentEntry: DocumentEntry) {
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

async function onDocumentEntryUpdate(formData: Record<string, any>) {
  isLoading.value = true;

  try {
    if (!isValidUUID(documentId.value))
      throw new Error(`Invalid UUID: ${documentId.value}`);
    if (!documentDefinition.value)
      throw new Error(
        `Document definition not found for type: ${documentEntryType}`,
      );

    await patchDocumentEntry("update", {
      id: documentId.value,
      type: documentDefinition.value.name,
      data: formData,
      definition: documentDefinition.value,
    });

    toast.add({
      isOpen: true,
      message: `${capitalize(documentDefinition.value.name)} correctly updated!`,
      onClose: () => {
        toast.clear();
      },
      msTimeout: 2500,
    });

    // Refresh the document entry to update the UI
    refreshNuxtData(`document-${documentId.value}`);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

async function onConfirmDocumentDefinitionUpdate(
  entry: DocumentEntry,
  definition: DocumentDefinition,
) {
  try {
    await patchDocumentEntry("update", {
      id: entry.id,
      type: entry.type,
      data: stripFieldsMissingInDefinition(entry.data, definition.fields),
      definition,
    });

    isUpdateDocumentDefinitionModalOpen.value = false;

    toast.add({
      isOpen: true,
      message: `${capitalize(entry.type)} correctly updated!`,
      onClose: () => toast.clear(),
      msTimeout: 2500,
    });

    // Refresh the document entry to update the UI
    refreshNuxtData(`document-${documentId.value}`);
  } catch (err) {
    console.error(err);
  }
}

const { shouldRenderSkeleton } = useSkeleton(computed(() => status.value));
</script>

<template>
  <section class="w-full">
    <header class="flex h-16 items-center gap-x-3 border-b border-gray-700 p-4">
      <h2 class="font-bold" v-text="documentEntry?.data.title" />
    </header>

    <UIDocumentFormSkeleton v-if="shouldRenderSkeleton" />
    <DocumentForm
      v-else-if="documentEntry && documentDefinition"
      v-model="documentEntry"
      :documentDefinition
      :hasDefinitionsMismatch
      isEditMode
      :isLoading
      @document-entry-delete="isDeleteDocumentEntryModalOpen = true"
      @document-entry-update="onDocumentEntryUpdate"
      @document-definition-update="isUpdateDocumentDefinitionModalOpen = true"
    />

    <UpdateDocumentDefinitionModal
      v-if="documentEntry && documentDefinition"
      :isOpen="isUpdateDocumentDefinitionModalOpen"
      @close="isUpdateDocumentDefinitionModalOpen = false"
      @confirm-document-definition-update="
        onConfirmDocumentDefinitionUpdate(documentEntry, documentDefinition)
      "
    />

    <DeleteDocumentEntryModal
      v-if="documentEntry"
      :isOpen="isDeleteDocumentEntryModalOpen"
      @close="isDeleteDocumentEntryModalOpen = false"
      @confirm-document-entry-delete="
        onConfirmDocumentEntryDelete(documentEntry)
      "
    />
  </section>
</template>
