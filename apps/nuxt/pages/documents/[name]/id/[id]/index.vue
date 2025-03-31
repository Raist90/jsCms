<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import { isValidUUID } from "~/predicates";
import { useDocumentsStore } from "~/store/documentsStore";
import type { DocumentEntry } from "~/types";

const { getDocumentEntryById, patchDocumentEntry } = useDocumentsStore();
const toast = useToast();
const { findDocumentDefinitionByType } = useCmsConfig();

const isSubmitUpdateDocumentDefinitionModalOpen = ref(false);
const isSubmitDeleteDocumentEntryModalOpen = ref(false);
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

const documentDefinition = findDocumentDefinitionByType(documentEntryType);

const hasDefinitionsMismatch = computed(() => {
  const stringifiedEntryDefinition = JSON.stringify(
    documentEntryDefinition.value,
  );
  const stringifiedDefinition = JSON.stringify(documentDefinition?.value);

  return !!(stringifiedEntryDefinition !== stringifiedDefinition);
});

async function onDocumentEntryDelete(documentEntry: DocumentEntry) {
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

// TODO: This shouldn't be here
function refreshDocumentEntry() {
  try {
    refreshNuxtData(`document-${documentId.value}`);
  } catch (err) {
    console.log(err);
  }
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

    refreshDocumentEntry();
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}

const isFieldMissingInDefinition = (field: string) => {
  return !documentDefinition?.value?.fields.some((f) => f.name === field);
};

const stripFieldsMissingInDefinition = (
  data: Record<string, any>,
): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(data)
      .filter(([key]) => !isFieldMissingInDefinition(key))
      .map(([key, value]) => {
        if (typeof value === "object" && !Array.isArray(value))
          return [key, stripFieldsMissingInDefinition(value)];
        else return [key, value];
      }),
  );
};

async function onDocumentDefinitionUpdate(entry: DocumentEntry) {
  // TODO: Handle the case when `documentDefinition` is null
  if (!documentDefinition?.value) return;

  try {
    await patchDocumentEntry("update", {
      id: entry.id,
      type: entry.type,
      data: stripFieldsMissingInDefinition(entry.data),
      definition: documentDefinition.value,
    });

    isSubmitUpdateDocumentDefinitionModalOpen.value = false;

    toast.add({
      isOpen: true,
      message: `${capitalize(entry.type)} correctly updated!`,
      onClose: () => toast.clear(),
      msTimeout: 2500,
    });

    // Refresh the document entry to update the UI
    refreshDocumentEntry();
  } catch (err) {
    console.error(err);
  }
}

const { shouldRenderSkeleton } = useSkeleton(computed(() => status.value));
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
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
      @document-entry-delete="isSubmitDeleteDocumentEntryModalOpen = true"
      @document-entry-update="onDocumentEntryUpdate"
      @document-definition-update="
        isSubmitUpdateDocumentDefinitionModalOpen = true
      "
    />

    <UIModal
      v-if="documentEntry"
      :isOpen="isSubmitUpdateDocumentDefinitionModalOpen"
      title="Are you sure?"
      @close="isSubmitUpdateDocumentDefinitionModalOpen = false"
    >
      <template #content>
        <p>
          Are you sure you want to update this document definition? By doing so
          you will lose some data referenced in the old schema.
        </p>
      </template>

      <template #cta>
        <div class="flex justify-between">
          <UIButton
            variant="danger"
            type="button"
            @click="onDocumentDefinitionUpdate(documentEntry)"
            >Update</UIButton
          >
          <UIButton
            variant="outline"
            type="button"
            @click="isSubmitUpdateDocumentDefinitionModalOpen = false"
            >Cancel</UIButton
          >
        </div>
      </template>
    </UIModal>

    <UIModal
      v-if="documentEntry"
      :isOpen="isSubmitDeleteDocumentEntryModalOpen"
      title="Are you sure?"
      @close="isSubmitDeleteDocumentEntryModalOpen = false"
    >
      <template #content>
        <p>Are you sure you want to delete this document?</p>
      </template>

      <template #cta>
        <div class="flex justify-between">
          <UIButton
            variant="danger"
            type="button"
            @click="onDocumentEntryDelete(documentEntry)"
            >Delete</UIButton
          >
          <UIButton
            variant="outline"
            type="button"
            @click="isSubmitDeleteDocumentEntryModalOpen = false"
            >Cancel</UIButton
          >
        </div>
      </template>
    </UIModal>
  </section>
</template>
