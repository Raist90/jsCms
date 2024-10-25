<script setup lang="ts">
import type { Document } from "~/types";

const props = defineProps<{ document: Document }>();
const fields = computed(() => props.document.fields);

const formData = reactive<{ [key: string]: any }>({});

const isFormDisabled = ref(false);
const isFormSubmitted = ref(false);
const onFormSubmit = () => {
  isFormDisabled.value = true;
  isFormSubmitted.value = true;
};

const onDocumentEdit = () => {
  isFormDisabled.value = false;
  isFormSubmitted.value = false;
};
</script>

<template>
  <section>
    <header class="mb-4">
      <h2 class="text-2xl mb-2">New {{ document.title }}</h2>
      <p class="text-sm" v-text="document.description" />
    </header>

    <div class="mb-4">
      <button
        v-if="isFormSubmitted"
        class="border border-gray-700 p-2"
        @click="onDocumentEdit"
      >
        Edit {{ document.name }}
      </button>
    </div>

    <form
      class="grid gap-y-4 p-4 border border-gray-700"
      @submit.prevent="onFormSubmit"
    >
      <div v-for="field in fields" :key="field.type">
        <div v-if="field.type === 'string'" class="grid grid-rows-2 gap-y-1">
          <label v-text="field.title" />
          <input
            v-model="formData[field.name]"
            :disabled="isFormDisabled"
            :name="field.name"
            class="border border-gray-700"
            type="text"
            :required="field.required"
          />
        </div>
      </div>

      <button
        :disabled="isFormDisabled"
        type="submit"
        class="border border-gray-700"
      >
        Save {{ document.name }}
      </button>
    </form>

    <p v-if="isFormSubmitted">
      {{ document.title }} {{ formData.title }} correctly saved!
    </p>
  </section>
</template>
