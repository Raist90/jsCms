<script setup lang="ts">
import config from "@/cmsConfig";
import Sidebar from "~/components/Sidebar.vue";

const {
  schema: { documents },
} = config;
</script>

<template>
  <div class="flex h-screen">
    <div class="w-60 flex-grow border-r border-gray-200">
      <Sidebar :documents />
    </div>

    <slot />
  </div>
</template>
