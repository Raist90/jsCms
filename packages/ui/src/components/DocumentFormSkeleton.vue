<script setup lang="ts">
import InputSkeleton from "../components/InputSkeleton.vue";
</script>

<template>
  <div class="w-10/12 animate-pulse space-y-4 p-4">
    <InputSkeleton v-for="(_, index) in 2" :key="index" />
  </div>
</template>
