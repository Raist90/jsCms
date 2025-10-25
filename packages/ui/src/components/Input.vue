<script setup lang="ts">
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

const model = defineModel<string | number>();
</script>

<template>
  <div class="flex w-full max-w-lg flex-col gap-y-2">
    <div>
      <div v-if="label" class="flex items-baseline">
        <label class="text-sm font-bold" v-text="label" />
        <UIBadge :status="required ? 'warning' : 'info'">{{
          `${required ? "Required" : "Optional"}`
        }}</UIBadge>
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
            'h-9 w-full bg-white px-2.5 py-1.5 text-gray-900 shadow-sm',
            withButton && 'w-full',
            disabled && 'cursor-not-allowed opacity-50',
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

    <UIAlert v-if="error" status="error">{{ error }}</UIAlert>
  </div>
</template>
