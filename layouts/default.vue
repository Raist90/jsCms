<script setup lang="ts">
import DocumentList from "~/components/DocumentList.vue";
import Sidebar from "~/components/Sidebar.vue";
import config from "@/cmsConfig";
import { getDocumentName } from "~/documents";

const {
  schema: { documents },
} = config;

const documentName = computed(() => getDocumentName());
</script>

<template>
  <div class="flex flex-row h-screen">
    <div class="w-60 shrink-0 border-r border-gray-200">
      <Sidebar :documents />
    </div>

    <div v-if="documentName" class="w-60 shrink-0 border-r border-gray-200">
      <DocumentList :documentName />
    </div>

    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
