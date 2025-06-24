<script setup lang="ts">
type Props = {
  solid?: boolean;
  status: "error" | "success" | "warning" | "info";
};
defineProps<Props>();
</script>

<template>
  <span
    class="rounded-md p-0.5 px-2 text-xs font-bold"
    :class="{
      'text-red-200': status === 'error',
      'text-green-200': status === 'success',
      'text-blue-200': status === 'info',
      'text-yellow-200': status === 'warning',
      'ml-1 bg-red-500/10': status === 'error' && solid,
      'ml-1 bg-green-500/10': status === 'success' && solid,
      'ml-1 bg-blue-500/10': status === 'info' && solid,
      'ml-1 bg-yellow-500/10': status === 'warning' && solid,
    }"
    ><slot
  /></span>
</template>
