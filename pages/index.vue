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
</script>

<template>
  <Studio :schema />
</template>
