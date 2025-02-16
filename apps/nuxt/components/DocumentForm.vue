<script setup lang="ts">
import type { Document, DocumentJsonModel } from "~/types";
import DynamicField from "./DynamicField.vue";
import { useDocumentsStore } from "~/store/documentsStore";

const props = defineProps<{ document: Document }>();
const fields = computed(() => props.document.fields);

const emit = defineEmits([
  "document-data-add",
  "document-data-delete",
  "document-data-update",
]);

const toast = useToast();

const model = defineModel<Record<string, any>>();
const formData = model.value?.data
  ? model.value.data
  : reactive<Record<string, any>>({});

const { patchDocumentsData } = useDocumentsStore();

// TODO: this is maybe too simple to work on long term. We should determine this based on the route current path maybe
const isEditMode = computed(() => !!model.value?.id);

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

  // TODO: find a more appealing name for this
  const newlyAssignedDocumentId = crypto.randomUUID();
  try {
    await patchDocumentsData(isEditMode.value ? "update" : "add", {
      id: isEditMode.value ? model.value?.id : newlyAssignedDocumentId,
      type: props.document.name,
      data: {
        ...formData,
      },
    } satisfies Omit<DocumentJsonModel, "timestamp">);

    toast.add({
      isOpen: true,
      message: `${capitalize(props.document.name)} correctly ${
        isEditMode.value ? "updated!" : "saved!"
      }`,
      onClose: () => {
        toast.clear();
        isFormDisabled.value = false;
      },
      msTimeout: 2500,
    });
  } catch (err) {
    console.error(err);
  }

  // TODO: this condition should be based on `operationType === "add"`
  if (!isEditMode.value) {
    navigateTo(
      `/documents/${props.document.name}/id/${newlyAssignedDocumentId}`,
    );
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
</script>

<template>
  <section>
    <form novalidate @submit.prevent="onFormSubmit">
      <div class="p-4 w-10/12 space-y-4">
        <template v-for="field in fields" :key="field.name">
          <DynamicField
            v-model="formData"
            :field="field"
            :formErrors
            :disabled="isFormDisabled"
          />
        </template>
      </div>

      <div class="p-4 flex justify-between border-y border-gray-700">
        <UIButton
          :disabled="isFormDisabled"
          type="submit"
          class="max-w-fit"
          size="md"
        >
          {{ isEditMode ? "Update" : "Save" }} {{ document.name }}
        </UIButton>

        <UIButton
          v-if="isEditMode"
          :disabled="isFormDisabled"
          type="button"
          class="max-w-fit"
          variant="danger"
          @click="emit('document-data-delete')"
        >
          Delete {{ document.name }}
        </UIButton>
      </div>
    </form>
  </section>
</template>
