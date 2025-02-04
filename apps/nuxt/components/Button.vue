<script setup lang="ts">
type Props = {
  extended?: boolean;
  type: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "tertiary" | "danger" | "warning";
};
defineProps<Props>();
</script>

<template>
  <button
    :class="{ 'w-fit': !extended }"
    class="bg-primary px-3 py-2 text-sm"
    :type
  >
    <slot />
  </button>
</template>
