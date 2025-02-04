<script setup lang="ts">
type Props = {
  solid?: boolean;
  status: "error" | "success" | "warning" | "info";
};
defineProps<Props>();
</script>

<template>
  <span
    class="text-xs rounded-md px-2 font-bold p-0.5"
    :class="{
      'text-red-200': status === 'error',
      'text-green-200': status === 'success',
      'text-blue-200': status === 'info',
      'text-yellow-200': status === 'warning',
      'bg-red-500/10 ml-1': status === 'error' && solid,
      'bg-green-500/10 ml-1': status === 'success' && solid,
      'bg-blue-500/10 ml-1': status === 'info' && solid,
      'bg-yellow-500/10 ml-1': status === 'warning' && solid,
    }"
    ><slot
  /></span>
</template>
