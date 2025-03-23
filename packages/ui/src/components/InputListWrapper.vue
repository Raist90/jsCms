<script setup lang="ts">
import Badge from "../components/Badge.vue";
import Alert from "../components/Alert.vue";
import { computed } from "vue";

type Props = {
  label: string;
  description?: string;
  of: "string" | "number" | "boolean" | (string & {});
  min?: number;
  max?: number;
  errors?: string[];
};
const props = defineProps<Props>();
const errors = computed(() => props.errors);

const model = defineModel<string[]>({ required: true });

function addItem() {
  model.value = [...model.value, ""]; // Add empty string for new item
}

function deleteItem(index: number) {
  model.value = model.value.filter((_, i) => i !== index);
}
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div class="border border-gray-700 p-4 max-w-lg" v-if="of === 'string'">
      <div class="flex items-baseline">
        <label class="text-sm font-bold" v-text="label" />
        <Badge
          :status="
            (min && model.length < min) || (max && model.length > max)
              ? 'warning'
              : 'info'
          "
          >{{ model.length }} items</Badge
        >
      </div>

      <p v-if="description" class="text-sm text-gray-300">{{ description }}</p>

      <div class="mt-1 flex flex-col gap-y-3">
        <div
          v-for="(_, index) in model"
          :key="index"
          :class="[
            errors &&
              errors.find((error) => error.includes(`[${index}]`)) &&
              'border-2 border-red-500',
            'flex mt-1',
          ]"
        >
          <slot name="item" :index />
          <button
            type="button"
            @click="deleteItem(index)"
            class="text-red-500 bg-gray-50 w-fit shrink-0 px-3 py-2 h-9 flex items-center border-l border-gray-300 text-sm"
          >
            Delete
          </button>
        </div>

        <button
          type="button"
          @click="addItem"
          class="h-9 w-full border border-dashed border-gray-700 text-sm"
        >
          Add item
        </button>

        <div class="flex flex-col gap-y-2">
          <div v-for="error in errors" :key="error">
            <Alert v-if="error" status="error">{{
              error.replace(/\[(\d+)\]/, (_, n) => `[${+n + 1}]`)
            }}</Alert>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
