<script setup lang="ts">
import { schema } from "~/frontend/schema";
import Studio from "~/components/Studio.vue";

// this creates the `schema` table if not exists
await $fetch("/api/schema", {
  method: "POST",
  body: {
    schema,
  },
});

// this creates the tables for each document if not exists
// const documents = schema.documents;
// documents.forEach((document) => createDocumentsTables(document));
</script>

<template>
  <Studio :schema />
</template>
