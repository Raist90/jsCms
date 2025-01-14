<script setup lang="ts">
import {
  isBooleanField,
  isNumberField,
  isObjectField,
  isPrimitiveField,
  isStringField,
  isSlugField,
} from "~/predicates";
import type { Document } from "~/types";
import { isBoolean, isString } from "@sindresorhus/is";

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

// TODO: this is maybe too simple to work on long term
const isEditMode = Object.keys(formData.value).length > 0;

watch(
  () => field,
  () => {
    if (field.value.type === "boolean" && !isEditMode)
      formData.value[field.value.name] = false;
  },
  { immediate: true },
);

function generateSlug(fieldName: string) {
  if ("fromField" in field.value && isString(field.value.fromField)) {
    const fromField = field.value?.fromField;
    if (fromField in formData.value)
      formData.value[fieldName] = slugify(formData.value[fromField]);
  }

  return;
}
</script>

<template>
  <template v-if="isPrimitiveField(field.type)">
    <UFormGroup
      v-slot="{ error }"
      :error="formErrors?.[field.name] && `${formErrors[field.name]}`"
      :required="
        isBoolean(field.required) ? field.required : field.required(formData)
      "
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
        :disabled
        :name="field.name"
        :type="isStringField(field.type) ? 'text' : 'number'"
        :required="
          isBoolean(field.required) ? field.required : field.required(formData)
        "
        :variant="(formErrors?.[field.name] && 'error') || undefined"
      />

      <div
        v-if="isBooleanField(field.type)"
        class="flex gap-x-2 items-center p-2"
      >
        <UToggle v-model="formData[field.name]" :disabled size="lg" />

        <p class="text-sm text-gray-300">
          {{ field.description }}
        </p>
      </div>

      <div v-if="isSlugField(field.type)">
        <UButtonGroup size="sm" orientation="horizontal">
          <UInput
            v-model="formData[field.name]"
            :trailingIcon="
              (error && 'i-heroicons-exclamation-triangle-20-solid') ||
              undefined
            "
            :disabled
            :name="field.name"
            type="text"
            :required="
              isBoolean(field.required)
                ? field.required
                : field.required(formData)
            "
            :variant="(formErrors?.[field.name] && 'error') || undefined"
          />

          <UButton color="gray" @click="generateSlug(field.name)"
            >Generate</UButton
          >
        </UButtonGroup>
      </div>
    </UFormGroup>
  </template>

  <template v-else-if="isObjectField(field.type)">
    <div>
      <h3 class="font-bold mb-1">{{ field.title }}</h3>
      <p class="text-sm text-gray-300 dark:text-gray-400">
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
