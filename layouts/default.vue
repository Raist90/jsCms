<script setup lang="ts">
import DocumentList from "~/components/DocumentList.vue";
import Sidebar from "~/components/Sidebar.vue";
import config from "@/cmsConfig";
import { getDocumentName } from "~/documents";
import Topbar from "~/components/Topbar.vue";

const {
  schema: { documents },
} = config;

const documentName = computed(() => getDocumentName());
</script>

<template>
  <div class="h-screen flex flex-col">
    <Topbar />

    <div class="flex flex-row flex-1">
      <div class="w-60 shrink-0 border-r border-gray-700">
        <Sidebar :documents />
      </div>

      <div v-if="documentName" class="w-60 shrink-0 border-r border-gray-700">
        <DocumentList :documentName />
      </div>

      <div class="flex-1 overflow-auto">
        <slot />
      </div>
    </div>
  </div>
</template>
