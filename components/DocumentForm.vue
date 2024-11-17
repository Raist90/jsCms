<script setup lang="ts">
import type { Document, DocumentJsonModel } from "~/types";
import DynamicField from "./DynamicField.vue";

const props = defineProps<{ document: Document }>();
const fields = computed(() => props.document.fields);
const formData = reactive<Record<string, any>>({});
const formErrors = ref<Record<string, string> | null>(null);

const isFormDisabled = ref(false);
const isFormSubmitted = ref(false);
const onFormSubmit = async () => {
  const validationErrors = validateDocumentFields(props.document, formData);
  if (validationErrors) {
    formErrors.value = validationErrors;
    return;
  }

  formErrors.value = null;
  isFormDisabled.value = true;
  isFormSubmitted.value = true;

  await $fetch("/api/documents", {
    method: "POST",
    body: {
      id: crypto.randomUUID(),
      type: props.document.name,
      data: {
        ...formData,
      },
    } satisfies DocumentJsonModel,
  });
};

const onDocumentEdit = () => {
  isFormDisabled.value = false;
  isFormSubmitted.value = false;
};

watch(
  () => fields,
  () => {
    fields.value.forEach((field) => {
      if (field.type === "object") {
        formData[field.name] = {};
      }
    });
  },
  { immediate: true },
);
</script>

<template>
  <section>
    <div v-if="isFormSubmitted" class="mb-4">
      <button class="border border-gray-700 p-2" @click="onDocumentEdit">
        Edit {{ document.name }}
      </button>
    </div>

    <form
      class="space-y-4 w-96 border-gray-200"
      novalidate
      @submit.prevent="onFormSubmit"
    >
      <template v-for="field in fields" :key="field.name">
        <DynamicField
          v-model="formData"
          :field="field"
          :form-errors
          :disabled="isFormDisabled"
        />
      </template>

      <UButton :disabled="isFormDisabled" type="submit" class="max-w-fit">
        Save {{ document.name }}
      </UButton>
    </form>

    <p v-if="isFormSubmitted">
      {{ document.title }} {{ formData.title }} correctly saved!
    </p>
  </section>
</template>
