<script setup lang="ts">
import {
  isBooleanField,
  isNumberField,
  isObjectField,
  isPrimitiveField,
  isStringField,
} from "~/predicates";
import type { Document } from "~/types";

type Props = {
  field: Document["fields"][number];
  formErrors: Record<string, string> | null;
  disabled: boolean;
};
const props = defineProps<Props>();
const field = computed(() => props.field);

const formData = defineModel<Record<string, any>>({
  required: true,
});

watch(
  () => field,
  () => {
    if (field.value.type === "boolean")
      formData.value[field.value.name] = false;
  },
  { immediate: true },
);
</script>

<template>
  <template v-if="isPrimitiveField(field.type)">
    <UFormGroup
      v-slot="{ error }"
      :error="formErrors?.[field.name] && `${formErrors[field.name]}`"
      :required="field.required"
      :description="
        (!isBooleanField(field.type) && field.description) || undefined
      "
      :label="field.title"
    >
      <UInput
        v-if="isStringField(field.type) || isNumberField(field.type)"
        v-model="formData[field.name]"
        :trailingIcon="
          (error && 'i-heroicons-exclamation-triangle-20-solid') || undefined
        "
        :color="(formErrors?.[field.name] && 'red') || undefined"
        :disabled
        :name="field.name"
        :type="isStringField(field.type) ? 'text' : 'number'"
        :required="field.required"
      />

      <div
        v-if="isBooleanField(field.type)"
        class="flex gap-x-2 items-center p-2 border"
      >
        <UToggle v-model="formData[field.name]" size="lg" />

        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ field.description }}
        </p>
      </div>
    </UFormGroup>
  </template>

  <template v-else-if="isObjectField(field.type)">
    <div>
      <h3 class="text font-bold mb-1">{{ field.title }}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        {{ field.description }}
      </p>
    </div>
    <DynamicField
      v-for="subfield in field.fields"
      :key="subfield.name"
      v-model="formData[field.name]"
      :field="subfield"
      :formErrors
      :disabled
    />
  </template>
</template>
