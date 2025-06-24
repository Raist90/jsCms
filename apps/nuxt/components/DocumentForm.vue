<script setup lang="ts">
import type { DocumentDefinition } from "~/types";
import DynamicField from "./DynamicField.vue";

const props = withDefaults(
  defineProps<{
    documentDefinition: DocumentDefinition;
    hasDefinitionsMismatch?: boolean;
    isEditMode?: boolean;
    isLoading?: boolean;
  }>(),
  {
    hasDefinitionsMismatch: false,
    isEditMode: false,
    isLoading: false,
  },
);
const fields = computed(() => props.documentDefinition.fields);
const documentDefinition = computed(() => props.documentDefinition);
const hasDefinitionsMismatch = computed(() => props.hasDefinitionsMismatch);
const isEditMode = computed(() => props.isEditMode);

const emit = defineEmits<{
  (e: "document-entry-delete" | "document-definition-update"): void;
  (
    e: "document-entry-add" | "document-entry-update",
    formData: Record<string, any>,
  ): void;
}>();

const model = defineModel<Record<string, any>>();
const formData = model.value?.data
  ? model.value.data
  : reactive<Record<string, any>>({});

const formErrors = ref<Record<string, string> | null>(null);

const onFormSubmit = async () => {
  const validationErrors = validateDocumentFields(fields.value, formData);
  if (validationErrors) {
    formErrors.value = validationErrors;
    return;
  }

  formErrors.value = null;

  if (isEditMode.value) emit("document-entry-update", formData);
  else emit("document-entry-add", formData);

  // Reinizialize deepclone of the original data
  originalRef.value = JSON.parse(JSON.stringify(formData));
  hasChanges.value = false;
};

// Initialize the form data with empty objects for nested fields
watch(
  fields,
  (val) => {
    val.forEach((field) => {
      if (field.type === "object" && !formData[field.name]) {
        formData[field.name] = {};
      }

      if (field.type === "array" && !formData[field.name]) {
        formData[field.name] = [];
      }
    });
  },
  { immediate: true },
);

const originalRef = ref(JSON.parse(JSON.stringify(formData)));
const hasChanges = ref(false);
watch(
  formData,
  (val) =>
    (hasChanges.value =
      JSON.stringify(val) !== JSON.stringify(originalRef.value)),
  { deep: true },
);
</script>

<template>
  <section v-if="hasDefinitionsMismatch">
    <UIAlert class="m-4 mb-0 h-auto w-fit" status="warning">
      The document definition has changed since the last time you saved this
      document. Please review the changes before updating it.
    </UIAlert>
  </section>

  <section>
    <form novalidate @submit.prevent="onFormSubmit">
      <div class="w-10/12 space-y-4 p-4">
        <template v-for="field in fields" :key="field.name">
          <DynamicField
            v-model="formData"
            :field="field"
            :formErrors
            :disabled="hasDefinitionsMismatch || isLoading"
          />
        </template>
      </div>

      <div class="flex justify-between border-y border-gray-700 p-4">
        <UIButton
          v-if="hasDefinitionsMismatch"
          type="button"
          class="max-w-fit"
          variant="outline"
          @click="emit('document-definition-update')"
        >
          Update this {{ documentDefinition.name }} definition
        </UIButton>
        <UIButton
          v-else
          :disabled="isLoading || !hasChanges"
          type="submit"
          class="max-w-fit"
          size="md"
        >
          {{ isEditMode ? "Update" : "Save" }} {{ documentDefinition.name }}
        </UIButton>

        <UIButton
          v-if="isEditMode"
          :disabled="isLoading && !hasDefinitionsMismatch"
          type="button"
          class="max-w-fit"
          variant="danger"
          @click="emit('document-entry-delete')"
        >
          Delete {{ documentDefinition.name }}
        </UIButton>
      </div>
    </form>
  </section>
</template>
