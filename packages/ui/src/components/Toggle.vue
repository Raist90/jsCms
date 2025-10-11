<script setup lang="ts">
import Badge from "./Badge.vue";

type Props = {
  description?: string;
  label: string;
  disabled: boolean;
};
defineProps<Props>();
const checked = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-y-2">
    <div class="flex items-baseline">
      <label class="text-sm font-bold" v-text="label" />
      <Badge status="info">{{ checked ? "True" : "False" }}</Badge>
    </div>

    <div class="flex items-center gap-x-2">
      <button
        :aria-checked="checked"
        :class="[
          'flex  h-7 w-[3.25rem] shrink-0 rounded-full p-0.5',
          checked ? 'border-blue-500 bg-blue-500' : 'bg-gray-400',
          disabled && 'cursor-not-allowed opacity-50',
        ]"
        :disabled
        role="switch"
        type="button"
        @click="checked = !checked"
      >
        <span
          class="h-full w-1/2 rounded-full bg-white transition duration-200 ease-in-out"
          :class="{ 'translate-x-6': checked }"
        />
      </button>

      <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>
    </div>
  </div>
</template>
