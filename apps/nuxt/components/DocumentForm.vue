<script setup lang="ts">
import type { DocumentDefinition, DocumentEntry } from "~/types";
import DynamicField from "./DynamicField.vue";
import { useDocumentsStore } from "~/store/documentsStore";

const props = defineProps<{ documentDefinition: DocumentDefinition }>();
const fields = computed(() => props.documentDefinition.fields);

const emit = defineEmits([
  "document-entry-add",
  "document-entry-delete",
  "document-entry-update",
]);

const toast = useToast();

const model = defineModel<Record<string, any>>();
const formData = model.value?.data
  ? model.value.data
  : reactive<Record<string, any>>({});

const entryDefinition = model.value?.definition;

const { patchDocumentEntry } = useDocumentsStore();

const route = useRoute();
const isEditMode = computed(() => !!route.params.id);

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

  const documentEntryId = crypto.randomUUID();
  try {
    await patchDocumentEntry(isEditMode.value ? "update" : "add", {
      id: isEditMode.value ? model.value?.id : documentEntryId,
      type: props.documentDefinition.name,
      data: {
        ...formData,
      },
      definition: props.documentDefinition,
    } satisfies Omit<DocumentEntry, "timestamp">);

    toast.add({
      isOpen: true,
      message: `${capitalize(props.documentDefinition.name)} correctly ${
        isEditMode.value ? "updated!" : "saved!"
      }`,
      onClose: () => {
        toast.clear();
        isFormDisabled.value = false;
      },
      msTimeout: 2500,
    });

    // Reinizialize deepclone of the original data
    originalRef.value = JSON.parse(JSON.stringify(formData));
    hasChanges.value = false;
  } catch (err) {
    console.error(err);
  }

  if (!isEditMode.value)
    navigateTo(
      `/documents/${props.documentDefinition.name}/id/${documentEntryId}`,
    );
};

// Initialize the form data with empty objects for nested fields
watch(
  fields,
  (val) => {
    if (!isEditMode.value)
      val.forEach((field) => {
        if (field.type === "object") {
          formData[field.name] = {};
        }

        if (field.type === "array") {
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

const hasDefinitionsMismatch = computed(() => {
  if (!isEditMode.value) return;

  const stringifiedDefinition = JSON.stringify(props.documentDefinition);
  const stringifiedEntryDefinition = JSON.stringify(entryDefinition);

  return stringifiedDefinition !== stringifiedEntryDefinition;
});
watch(
  hasDefinitionsMismatch,
  (val) => {
    if (val) isFormDisabled.value = true;
    else isFormDisabled.value = false;
  },
  { immediate: true },
);
</script>

<template>
  <section v-if="hasDefinitionsMismatch">
    <UIAlert class="w-fit h-auto m-4 mb-0" status="warning">
      The document definition has changed since the last time you saved this
      document. Please review the changes before updating it.
    </UIAlert>
  </section>
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
          v-if="hasDefinitionsMismatch"
          type="button"
          class="max-w-fit"
          variant="outline"
        >
          Update this {{ documentDefinition.name }} definition
        </UIButton>
        <UIButton
          v-else
          :disabled="isFormDisabled || !hasChanges"
          type="submit"
          class="max-w-fit"
          size="md"
        >
          {{ isEditMode ? "Update" : "Save" }} {{ documentDefinition.name }}
        </UIButton>

        <UIButton
          v-if="isEditMode"
          :disabled="isFormDisabled && !hasDefinitionsMismatch"
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
