<script setup lang="ts">
import type { Document, DocumentJsonModel } from "~/types";
import DynamicField from "./DynamicField.vue";

const props = defineProps<{ document: Document }>();
const fields = computed(() => props.document.fields);

const toast = useToast();

const model = defineModel<Record<string, any>>();
const formData = model.value?.data
  ? model.value.data
  : reactive<Record<string, any>>({});

// TODO: this is maybe too simple to work on long term
const isEditMode = Object.keys(formData).length > 0;

const formErrors = ref<Record<string, string> | null>(null);
const isFormDisabled = ref(false);

const onFormSubmit = async () => {
  const validationErrors = validateDocumentFields(fields.value, formData);
  if (validationErrors) {
    formErrors.value = validationErrors;
    return;
  }

  formErrors.value = null;
  isFormDisabled.value = true;

  try {
    await $fetch("/api/documents", {
      method: "POST",
      body: {
        // TODO: `model.value?.id` is any. Make sure to narrow it's type
        id: isEditMode ? model.value?.id : crypto.randomUUID(),
        type: props.document.name,
        data: {
          ...formData,
        },
      } satisfies Omit<DocumentJsonModel, "timestamp">,
    });

    toast.add({
      timeout: 1500,
      title: `${capitalize(props.document.name)} correctly ${isEditMode ? "updated!" : "saved!"}`,
      callback: () => reloadNuxtApp({ force: true }),
    });
  } catch (err) {
    console.error(err);
  }
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

async function onDocumentDelete(id?: string) {
  if (!id) return;
  await $fetch(`/api/document/delete/id/${id}`, {
    method: "POST",
  });

  navigateTo(`/documents/${props.document.name}`, {
    external: true,
  });
}
</script>

<template>
  <section>
    <form class="space-y-4 w-10/12" novalidate @submit.prevent="onFormSubmit">
      <template v-for="field in fields" :key="field.name">
        <DynamicField
          v-model="formData"
          :field="field"
          :formErrors
          :disabled="isFormDisabled"
        />
      </template>

      <div class="flex justify-between">
        <UButton
          :disabled="isFormDisabled"
          type="submit"
          class="max-w-fit"
          size="md"
        >
          {{ isEditMode ? "Update" : "Save" }} {{ document.name }}
        </UButton>

        <UButton
          v-if="isEditMode"
          :disabled="isFormDisabled"
          type="button"
          class="max-w-fit"
          size="md"
          color="red"
          icon="i-heroicons-trash"
          @click="onDocumentDelete(model?.id)"
        >
          Delete {{ document.name }}
        </UButton>
      </div>
    </form>
  </section>
</template>
