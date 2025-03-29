<script setup lang="ts">
import InputSkeleton from "../components/InputSkeleton.vue";
</script>

<template>
  <div class="p-4 w-10/12 space-y-4 animate-pulse">
    <InputSkeleton v-for="(_, index) in 2" :key="index" />
  </div>
</template>
