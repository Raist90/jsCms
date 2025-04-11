<script setup lang="ts">
import Badge from "../components/Badge.vue";
import Alert from "../components/Alert.vue";
import { computed } from "vue";

type Props = {
  label: string;
  description?: string;
  disabled: boolean;
  of: "string" | "number";
  min?: number;
  max?: number;
  errors?: string[];
};
const props = defineProps<Props>();
const errors = computed(() => props.errors);

// This type depends on the value of props.of
const model = defineModel<any[]>({ required: true });

function addItem() {
  if (props.of === "string") model.value = [...model.value, ""];
  if (props.of === "number") model.value = [...model.value, 0];
}

function deleteItem(index: number) {
  model.value = model.value.filter((_, i) => i !== index);
}
</script>

<template>
  <div class="flex flex-col gap-y-2 w-full max-w-lg">
    <div class="border border-gray-700 p-4 max-w-lg">
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
            'flex mt-1 h-9',
          ]"
        >
          <slot name="item" :index />
          <button
            :disabled
            type="button"
            @click="deleteItem(index)"
            :class="[
              disabled && 'opacity-50 cursor-not-allowed',
              'text-red-500 bg-gray-50 w-fit shrink-0 px-3 py-2 flex items-center border-l border-gray-300 text-sm',
            ]"
          >
            Delete
          </button>
        </div>

        <button
          :disabled
          type="button"
          @click="addItem"
          :class="[
            disabled && 'opacity-50 cursor-not-allowed',
            'h-9 w-full border border-dashed border-gray-700 text-sm',
          ]"
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
