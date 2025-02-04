<script setup lang="ts">
type Props = {
  status: "error" | "success" | "warning" | "info";
};
defineProps<Props>();
</script>

<template>
  <div
    class="border flex px-2 items-center h-9"
    :class="{
      'border-red-500 bg-red-500/10': status === 'error',
      'border-green-500 bg-green-500/10': status === 'success',
      'border-blue-500 bg-blue-500/10': status === 'info',
      'border-yellow-500 bg-yellow-500/10': status === 'warning',
    }"
    role="alert"
  >
    <span
      class="text-sm"
      :class="{
        'text-red-200': status === 'error',
        'text-green-200': status === 'success',
        'text-blue-200': status === 'info',
        'text-yellow-200': status === 'warning',
      }"
    >
      <slot
    /></span>
  </div>
</template>
