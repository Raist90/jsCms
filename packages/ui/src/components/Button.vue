<script setup lang="ts">
import { ref } from "vue";

type Props = {
  disabled?: boolean;
  extended?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger" | "warning" | "outline";
};
withDefaults(defineProps<Props>(), {
  disabled: false,
  extended: false,
  type: "button",
  variant: "primary",
});

const variantList = ref({
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-gray-900",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-white",
  outline: "bg-gray-200 text-gray-700",
});
</script>

<template>
  <button
    :disabled
    :class="[
      'block px-3 py-2 text-sm w-fit',
      variantList[variant],
      extended && 'w-full',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    :type
  >
    <slot />
  </button>
</template>
