<script setup lang="ts">
import { Badge } from "jscms-ui";

type Props = {
  description?: string;
  label: string;
};
defineProps<Props>();
const checked = defineModel<boolean>({
  required: true,
});
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div class="flex items-baseline">
      <label class="text-sm font-bold" v-text="label" />
      <Badge status="info">{{ checked ? "True" : "False" }}</Badge>
    </div>

    <div class="flex gap-x-2 items-center">
      <button
        :aria-checked="checked"
        :class="[
          'p-0.5  h-7 w-[3.25rem] flex shrink-0 rounded-full',
          checked ? 'bg-blue-500 border-blue-500' : 'bg-gray-400',
        ]"
        role="switch"
        type="button"
        @click="checked = !checked"
      >
        <span
          class="h-full w-1/2 bg-white transition duration-200 ease-in-out rounded-full"
          :class="{ 'transform translate-x-6': checked }"
        />
      </button>

      <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>
    </div>
  </div>
</template>
