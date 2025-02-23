<script setup lang="ts">
import { Alert, Badge } from "jscms-ui";

type Props = {
  description?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
  name: string;
  required?: boolean;
  type: "text" | "number";
  withButton?: boolean;
};
defineProps<Props>();

const model = defineModel<string>();
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div>
      <div v-if="label" class="flex items-baseline">
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
          v-model="model"
        />
        <slot v-if="withButton" name="button" />
      </div>
    </div>

    <Alert v-if="error" status="error">{{ error }}</Alert>
  </div>
</template>
