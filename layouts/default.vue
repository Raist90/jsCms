<script setup lang="ts">
import config from "@/cmsConfig";
import Sidebar from "~/components/Sidebar.vue";

const {
  schema: { documents },
} = config;
</script>

<template>
  <div class="flex flex-row h-screen">
    <div class="w-60 shrink-0 border-r border-gray-200">
      <Sidebar :documents />
    </div>

    <div class="flex-1 overflow-auto">
      <slot />
    </div>
  </div>
</template>
