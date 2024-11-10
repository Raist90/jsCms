<script setup lang="ts">
import type { Document, DocumentJsonModel } from "~/types";

const props = defineProps<{ document: Document }>();
const fields = computed(() => props.document.fields);

const formData = reactive<{ [key: string]: any }>({});
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
      document: props.document,
      data: {
        id: crypto.randomUUID(),
        name: props.document.name,
        type: props.document.type,
        ...formData,
      } satisfies DocumentJsonModel,
    },
  });
};

const onDocumentEdit = () => {
  isFormDisabled.value = false;
  isFormSubmitted.value = false;
};
</script>

<template>
  <section>
    <div v-if="isFormSubmitted" class="mb-4">
      <button class="border border-gray-700 p-2" @click="onDocumentEdit">
        Edit {{ document.name }}
      </button>
    </div>

    <form
      class="space-y-4 w-1/2 mx-auto border border-gray-200 p-4"
      novalidate
      @submit.prevent="onFormSubmit"
    >
      <div v-for="field in fields" :key="field.name">
        <div v-if="field.type === 'string'">
          <UFormGroup :label="field.title">
            <UInput
              v-model="formData[field.name]"
              :color="(formErrors?.[field.name] && 'red') || undefined"
              :disabled="isFormDisabled"
              :name="field.name"
              type="text"
              :required="field.required"
            />
          </UFormGroup>
          <p v-if="formErrors?.[field.name]" class="text-red-500 mt-2 text-sm">
            {{ formErrors[field.name] }}
          </p>
        </div>
      </div>

      <UButton :disabled="isFormDisabled" type="submit" class="max-w-fit">
        Save {{ document.name }}
      </UButton>
    </form>

    <p v-if="isFormSubmitted">
      {{ document.title }} {{ formData.title }} correctly saved!
    </p>
  </section>
</template>
