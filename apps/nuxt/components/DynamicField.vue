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
import { isBoolean, isFunction, isString } from "@sindresorhus/is";

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

const route = useRoute();
const isEditMode = computed(() => !!route.params.id);

// Inizialize boolean values
onMounted(() => {
  if (!isEditMode.value) {
    if (field.value.type === "boolean")
      formData.value[field.value.name] = false;
  }
});

function generateSlug(fieldName: string) {
  if ("slugify" in field.value && isString(field.value.slugify)) {
    const fromField = field.value?.slugify;
    if (fromField in formData.value)
      formData.value[fieldName] = slugify(formData.value[fromField]);
  } else if ("slugify" in field.value && isFunction(field.value?.slugify)) {
    formData.value[fieldName] = field.value.slugify(formData.value);
  }

  return;
}
</script>

<template>
  <template v-if="isPrimitiveField(field.type)">
    <UIInput
      v-if="isStringField(field.type) || isNumberField(field.type)"
      v-model="formData[field.name]"
      :disabled
      :description="field.description"
      :name="field.name"
      :type="isStringField(field.type) ? 'text' : 'number'"
      :required="
        isBoolean(field.required) ? field.required : field.required(formData)
      "
      :error="formErrors?.[field.name] || undefined"
      :label="field.title"
    />

    <div
      v-if="isBooleanField(field.type)"
      class="flex gap-x-2 items-center p-2"
    >
      <UIToggle
        v-model="formData[field.name]"
        :label="field.title"
        :description="field.description"
        :disabled
        size="lg"
      />
    </div>

    <div v-if="isSlugField(field.type)">
      <UIInput
        v-model="formData[field.name]"
        :description="field.description"
        :disabled
        :name="field.name"
        type="text"
        :required="
          isBoolean(field.required) ? field.required : field.required(formData)
        "
        :error="formErrors?.[field.name] || undefined"
        :label="field.title"
        withButton
      >
        <template #button>
          <button
            :disabled
            :class="[
              'text-gray-900 bg-gray-50 w-fit shrink-0 px-3 py-2 h-9 flex items-center border-l border-gray-300 text-sm',
              disabled && 'opacity-80 cursor-not-allowed',
            ]"
            type="button"
            @click="generateSlug(field.name)"
          >
            Generate
          </button>
        </template>
      </UIInput>
    </div>
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
