<script setup lang="ts">
import { ref } from "vue";

type Props = {
  disabled?: boolean;
  extended?: boolean;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger" | "warning" | "outline";
  size?: "sm" | "md" | "lg";
};
withDefaults(defineProps<Props>(), {
  disabled: false,
  extended: false,
  type: "button",
  variant: "primary",
  size: "md",
});

const variantMap = ref({
  primary: "bg-blue-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-yellow-500 text-white",
  outline: "bg-gray-200 text-gray-700",
}) satisfies Record<keyof Props["size"], string>;

const sizeMap = ref({
  sm: "px-2.5 py-1 text-xs",
  md: "px-3 py-2 text-sm",
  lg: "px-4 py-3 text-base",
}) satisfies Record<keyof Props["size"], string>;
</script>

<template>
  <button
    :disabled
    class="block"
    :class="[
      variantMap[variant],
      extended ? 'w-full' : 'w-fit',
      disabled && 'opacity-50 cursor-not-allowed',
      sizeMap[size],
    ]"
    :type
  >
    <slot />
  </button>
</template>
