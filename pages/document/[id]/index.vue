<script setup lang="ts">
import { isString } from "@sindresorhus/is";
import config from "@/cmsConfig";
import DocumentForm from "~/components/DocumentForm.vue";

const { params } = useRoute();
const documentId = (isString(params.id) && params.id) || null;
if (!documentId)
  throw createError({ statusCode: 404, message: "Document not found" });

async function getDocumentData(id: string) {
  const { data } = await useFetch(`/api/document/data/${id}`, {
    method: "GET",
  });

  if (data.value) return data.value;
}

// this will basically be `formData`
// TODO: parse `documentData.data` with `zod`
const documentData = await getDocumentData(documentId);
const documentSchema = config.schema.documents.find(
  (document) => document.name === documentData?.type,
);
// TODO: add `documentData` as model of `documentForm` and make it optional. If it exists, it will be used to populate the form fields. `formData` will be equal to this or to an empty object
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-200 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="documentData?.data.title" />
    </header>

    <div v-if="documentSchema" class="p-4 h-full">
      <DocumentForm :document="documentSchema" />
    </div>
  </section>
</template>
