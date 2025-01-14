<script setup lang="ts">
import { isString } from "@sindresorhus/is";
import config from "@/cmsConfig";
import DocumentForm from "~/components/DocumentForm.vue";
import type { DocumentJsonModel } from "~/types";

const { params } = useRoute();
const documentId = (isString(params.id) && params.id) || null;
if (!documentId)
  throw createError({ statusCode: 404, message: "Document not found" });

async function getDocumentData(id: string) {
  const { data } = await useFetch<DocumentJsonModel>(
    `/api/document/data/id/${id}`,
    {
      method: "GET",
    },
  );

  if (!data.value)
    throw createError({ statusCode: 404, message: "Document not found" });
  return data.value;
}

const documentData = await getDocumentData(documentId);
const documentSchema = config.schema.documents.find(
  (document) => document.name === documentData?.type,
);
</script>

<template>
  <section class="w-full">
    <header class="p-4 border-b border-gray-700 flex gap-x-3 items-center h-16">
      <h2 class="font-bold" v-text="documentData?.data.title" />
    </header>

    <DocumentForm
      v-if="documentSchema"
      v-model="documentData"
      :document="documentSchema"
    />
  </section>
</template>
