<script setup lang="ts">
import type { Document } from "~/types";

type Props = {
  field: Document["fields"][number];
  formErrors: Record<string, string> | null;
  disabled: boolean;
};
defineProps<Props>();
const formData = defineModel<{ [key: string]: any }>({ required: true });
</script>

<template>
  <div v-if="field.type === 'string'">
    <UFormGroup :label="field.title">
      <UInput
        v-model="formData[field.name]"
        :color="(formErrors?.[field.name] && 'red') || undefined"
        :disabled
        :name="field.name"
        type="text"
        :required="field.required"
      />
    </UFormGroup>
    <p v-if="formErrors?.[field.name]" class="text-red-500 mt-2 text-sm">
      {{ formErrors[field.name] }}
    </p>
  </div>
</template>
