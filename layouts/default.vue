<script setup lang="ts">
import DocumentList from "~/components/DocumentList.vue";
import Sidebar from "~/components/Sidebar.vue";
import config from "@/cmsConfig";

const {
  schema: { documents },
} = config;

// TODO: maybe rename function in `getDocumentName` and pass options to specify how (in this case using `routeParam`)
const documentName = getRouteParam();
const { data: documentList } = await useFetch("/api/documentsList", {
  method: "POST",
  body: {
    documentName,
  },
});
</script>

<template>
  <div class="flex flex-row h-screen">
    <div class="w-60 shrink-0 border-r border-gray-200">
      <Sidebar :documents />
    </div>

    <div
      v-if="documentName && documentList?.length"
      class="w-60 shrink-0 border-r border-gray-200"
    >
      <DocumentList :documentName :documentList />
    </div>

    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
