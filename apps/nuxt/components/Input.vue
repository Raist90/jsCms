<script setup lang="ts">
import Alert from "jscms-ui";
import Bagde from "./Badge.vue";

type Props = {
  description?: string;
  disabled?: boolean;
  error?: string;
  label: string;
  name: string;
  required?: boolean;
  type: "text";
  variant?: "error";
  withButton?: boolean;
};
defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div>
      <div class="flex items-baseline">
        <label class="text-sm font-bold" v-text="label" />
        <Bagde :status="required ? 'warning' : 'info'">{{
          `${required ? "Required" : "Optional"}`
        }}</Bagde>
      </div>

      <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>

      <input
        v-if="!withButton"
        class="bg-white mt-1 shadow-sm text-gray-900 w-full h-9 py-1.5 px-2.5"
        :class="{ 'border-2 border-red-500': error }"
        :name
        :required
        :type
      />
      <div v-else class="flex">
        <input
          class="bg-white mt-1 shadow-sm text-gray-900 h-9 py-1.5 px-2.5 w-full"
          :class="{ 'border-2 border-red-500': error }"
          :name
          :required
          :type
        />
        <button
          class="text-gray-900 bg-gray-50 mt-1 w-fit shrink-0 px-3 py-2 h-9 flex items-center border-l border-gray-300 text-sm"
          type="button"
        >
          Generate
        </button>
      </div>
    </div>

    <Alert v-if="error" status="error">{{ error }}</Alert>
  </div>
</template>
