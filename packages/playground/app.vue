<script setup lang="ts">
const { data } = await useFetch("/api/articles");
</script>

<template>
  <div>{{ data?.result }}</div>
</template>
