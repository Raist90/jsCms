<script setup lang="ts">
import { Alert, Badge } from "jscms-ui";

type Props = {
  description?: string;
  disabled?: boolean;
  error?: string;
  label: string;
  name: string;
  required?: boolean;
  type: "text";
  withButton?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div>
      <div class="flex items-baseline">
        <label class="text-sm font-bold" v-text="label" />
        <Badge :status="required ? 'warning' : 'info'">{{
          `${required ? "Required" : "Optional"}`
        }}</Badge>
      </div>

      <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>

      <div
        :class="[
          'mt-1',
          withButton && 'flex',
          error && 'border-2 border-red-500',
        ]"
      >
        <input
          :class="[
            'bg-white shadow-sm text-gray-900 w-full h-9 py-1.5 px-2.5',
            withButton && 'w-full',
            disabled && 'opacity-80 cursor-not-allowed',
          ]"
          :name
          :required
          :type
          :disabled
        />
        <button
          :disabled
          v-if="withButton"
          :class="[
            'text-gray-900 bg-gray-50 w-fit shrink-0 px-3 py-2 h-9 flex items-center border-l border-gray-300 text-sm',
            disabled && 'opacity-80 cursor-not-allowed',
          ]"
          type="button"
        >
          Generate
        </button>
      </div>
    </div>

    <Alert v-if="error" status="error">{{ error }}</Alert>
  </div>
</template>
