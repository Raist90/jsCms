<script setup lang="ts">
import { isString } from "@sindresorhus/is";
import type { Document } from "~/types";

defineProps<{ documents: Document[] }>();

let routeParam: string | undefined;
const { params } = useRoute();
if (isString(params.name)) routeParam = params.name;
else routeParam = undefined;
</script>

<template>
  <section>
    <header class="p-4 border-b border-gray-200 flex items-center h-16">
      <h2 class="font-bold">Documents</h2>
    </header>

    <nav class="p-4">
      <ul class="grid gap-y-2">
        <li v-for="document in documents" :key="document.name">
          <ULink
            :external="true"
            :to="`/documents/${document.name}`"
            :active="(routeParam && document.name === routeParam) || undefined"
            activeClass="text-primary"
            >{{ document.title }}</ULink
          >
        </li>
      </ul>
    </nav>
  </section>
</template>
