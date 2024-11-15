<script setup lang="ts">
import { schema } from "~/frontend/schema";

// this creates the `schema` table if not exists
// TODO: add possibility to override this by user, like `update schema`
await $fetch("/api/schema", {
  method: "POST",
  body: {
    schema,
  },
});
</script>

<template>
  <div></div>
</template>
