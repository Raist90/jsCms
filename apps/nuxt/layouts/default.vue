<script setup lang="ts">
import DocumentList from "~/components/DocumentList.vue";
import Sidebar from "~/components/Sidebar.vue";
import config from "@/cmsConfig";
import Topbar from "~/components/Topbar.vue";

const {
  schema: { documents },
} = config;

const route = useRoute();
const { currentDocumentName: documentType } = useExtractRouteData(route);
</script>

<template>
  <div class="h-screen flex flex-col">
    <Topbar />

    <div class="flex flex-row flex-1">
      <div class="w-60 shrink-0 border-r border-gray-700">
        <Sidebar :documents />
      </div>

      <div v-if="documentType" class="w-60 shrink-0 border-r border-gray-700">
        <DocumentList :documentType />
      </div>

      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
