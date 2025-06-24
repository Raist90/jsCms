<script setup lang="ts">
import DocumentForm from "~/components/DocumentForm.vue";
import { useDocumentsStore } from "~/store/documentsStore";

const route = useRoute();
const { currentDocumentEntryName: documentEntryType } =
  useExtractRouteData(route);

const { findDocumentDefinitionByType } = await useCmsConfig();
const documentDefinition = findDocumentDefinitionByType(documentEntryType);

const { patchDocumentEntry } = useDocumentsStore();
const toast = useToast();

const isLoading = ref(false);

async function onDocumentEntryAdd(formData: Record<string, any>) {
  isLoading.value = true;

  try {
    const documentEntryId = crypto.randomUUID();

    if (!documentDefinition.value)
      throw new Error(
        `Document definition not found for type: ${documentEntryType}`,
      );

    await patchDocumentEntry("add", {
      id: documentEntryId,
      type: documentDefinition.value.name,
      data: {
        ...formData,
      },
      definition: documentDefinition.value,
    });

    toast.add({
      isOpen: true,
      message: `${capitalize(documentDefinition.value.name)} correctly saved!`,
      onClose: () => {
        toast.clear();
      },
      msTimeout: 2500,
    });

    navigateTo(
      `/documents/${documentDefinition.value.name}/id/${documentEntryId}`,
    );
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <section v-if="documentDefinition" class="w-full">
    <header class="flex h-16 items-center gap-x-3 border-b border-gray-700 p-4">
      <h2 class="font-bold" v-text="`New ${documentDefinition.name}`" />
    </header>

    <DocumentForm
      :documentDefinition
      :isLoading
      @document-entry-add="onDocumentEntryAdd"
    />
  </section>
</template>
