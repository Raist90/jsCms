<script setup lang="ts">
type Props = {
  to: string;
  active?: boolean;
  activeClass?: string;
  disabled?: boolean;
};
defineProps<Props>();
</script>

<template>
  <a :disabled :href="to" :class="[active && activeClass]"><slot /></a>
</template>
