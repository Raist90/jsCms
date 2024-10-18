<script setup lang="ts">
import { schema } from "~/frontend/schema";
import Studio from "~/components/Studio.vue";

await $fetch("/api/schema", {
  method: "POST",
  body: {
    value: schema,
  },
});
</script>

<template>
  <Studio :schema />
</template>
